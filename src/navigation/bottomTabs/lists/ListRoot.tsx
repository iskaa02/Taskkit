import LeftAccentCard from "@/components/Cards";
import Fab from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import withDB from "@/db/models/withDB";
import { ListStackScreenProps, ListStackType } from "@/navigation/navPropsType";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Database } from "@nozbe/watermelondb";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Heading, Icon, ScrollView, Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
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
        options={{ headerShown: false }}
        component={ListRoot}
      />
      <Stack.Screen name="Task" component={TaskScreen} />
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator>
  );
}

function ListRoot(p: ListStackScreenProps<"Root">) {
  const addListRef = React.useRef<BottomSheetModalMethods>(null);
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Heading mx="20px" mt="20px" mb="10px">
        {t("list", { count: 10, postProcess: "interval" })}
      </Heading>
      <ScrollView>
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
          {t("add") + " " + t("list", { count: 1, postProcess: "interval" })}
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
const ListView = withDB<ListViewProps, { lists: List[] }>(
  ({ lists, navigation }) => (
    <>
      {lists.map(list => (
        <Card key={list.id} navigation={navigation} list={list} />
      ))}
    </>
  ),
  ["database"],
  ({ database }) => ({
    lists: database.get<List>(Tables.List).query(),
  })
);
const RawCard = ({
  list,
  navigation,
  count,
}: {
  list: List;
  navigation: any;
  count: number;
}) => {
  const { t } = useTranslation();
  return (
    <LeftAccentCard
      style={{ marginHorizontal: 10 }}
      onPress={() => {
        navigation.push("List", {
          listID: list.id,
        });
      }}
      theme={list.theme}
    >
      <Text
        textAlign="left"
        isTruncated
        style={{ paddingEnd: 10 }}
        fontSize="xl"
        bold
      >
        {list.name}
      </Text>
      <Text fontSize="md">
        {t("task-left-count", { count, postProcess: "interval" })}
      </Text>
    </LeftAccentCard>
  );
};

const Card = withDB(RawCard, ["list"], ({ list }) => ({
  list,
  count: list.tasks.observeCount(),
}));
