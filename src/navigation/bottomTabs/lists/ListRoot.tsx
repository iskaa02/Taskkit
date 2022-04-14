import LeftAccentCard from "@/components/Cards";
import Fab from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Columns, Tables } from "@/db/models/schema";
import withDB from "@/db/models/withDB";
import { ListStackScreenProps, ListStackType } from "@/navigation/navPropsType";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Database, Q } from "@nozbe/watermelondb";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon, ScrollView, Text } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddListSheet from "./listScreen/AddListSheet";
import ListScreen from "./listScreen/ListScreen";
import TaskScreen from "./task/TaskScreen";

const Stack = createNativeStackNavigator<ListStackType>();
export default function Lists() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        headerShadowVisible: false,
      }}
      initialRouteName="Root"
    >
      <Stack.Screen
        name="Root"
        component={ListRoot}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Task" component={TaskScreen} />
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator>
  );
}

function ListRoot(p: ListStackScreenProps<"Root">) {
  const addListRef = React.useRef<BottomSheetModalMethods>(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView px="10px">
        <Text fontSize="2xl" mx="10px" my="3" bold color="em.1">
          Lists
        </Text>
        <ListView {...p} database={database} />
      </ScrollView>
      <Fab
        style={{
          width: undefined,
          paddingHorizontal: 15,
          borderRadius: 15,
          flexDirection: "row",
        }}
        onPress={() => {
          addListRef.current?.present();
        }}
      >
        <Icon
          size={25}
          style={{ marginEnd: 5 }}
          as={<Feather name="plus" />}
          color="em.1"
        />
        <Text color="em.1" fontSize="md" bold>
          Add List
        </Text>
      </Fab>
      <AddListSheet ref={addListRef} />
    </SafeAreaView>
  );
}
type ListViewProps = ListStackScreenProps<"Root"> & {
  lists: List[];
  database: Database;
};
const RawListView = ({ lists, ...p }: ListViewProps) => {
  return (
    <>
      {lists.map(list => (
        <Card key={list.id} navigation={p.navigation} list={list} />
      ))}
    </>
  );
};
const RawCard = ({ list, navigation }: { list: List; navigation: any }) => {
  const [count, setCount] = React.useState(0);
  list.tasks
    .extend(Q.where(Columns.task.isCompleted, Q.eq(false)))
    .fetchCount()
    .then(i => {
      setCount(i);
    });
  return (
    <LeftAccentCard
      onPress={() => {
        navigation.push("List", {
          listID: list.id,
        });
      }}
      theme={list.theme}
    >
      <Text fontSize="xl" bold>
        {list.name}
      </Text>
      <Text fontSize="md">
        {!!count ? `${count} Tasks Left` : "No Tasks Left"}
      </Text>
    </LeftAccentCard>
  );
};

const Card = withDB(RawCard, ["list"], ({ list }) => ({
  list,
}));

const ListView = withDB<ListViewProps, { lists: List[] }>(
  RawListView,
  ["database"],
  ({ database }) => ({
    lists: database.get<List>(Tables.List).query(),
  })
);
