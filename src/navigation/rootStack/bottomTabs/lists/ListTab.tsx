import { LeftAccentCard } from "@/components/Cards";
import { Fab } from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import List from "@/db/models/List";
import Theme from "@/db/models/Theme";
import { RootStackParamList } from "@/navigation/types";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Database from "@nozbe/watermelondb/Database";
import withObservables from "@nozbe/with-observables";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon, ScrollView, Text } from "native-base";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddListSheet } from "./AddListSheet";
import { ListStackScreenProps, ListTabStack } from "./Stack";

export default function TaskListGroup({}: ListStackScreenProps<"Root">) {
  const addListRef = React.useRef<BottomSheetModalMethods>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView px="10px">
        <Text fontSize={32} mx="10px" my="3" bold color="em.1">
          Lists
        </Text>
        <Lists database={database} />
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
        <Text color="em.1" fontSize={16} bold>
          Add List
        </Text>
      </Fab>
      <AddListSheet ref={addListRef} />
    </SafeAreaView>
  );
}
type listProps = {
  list: List;
  theme: Theme;
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<ListTabStack, "Root">,
    NativeStackNavigationProp<RootStackParamList, "Root">
  >;
};
const RawListCard = ({ list, navigation, theme }: listProps) => {
  return (
    <LeftAccentCard
      onPress={() => {
        navigation.push("List", {
          listID: list.id,
        });
      }}
      theme={theme}
    >
      <Text fontSize={20} bold>
        {list.name}
      </Text>
      <Text fontSize={16}>5 Task left</Text>
    </LeftAccentCard>
  );
};
const ListCard = withObservables<listProps, {}>(["list"], ({ list }) => ({
  list: list,
  theme: list.theme,
}))(RawListCard);

const enhance = withObservables<{ database: Database }, ListsProps>(
  ["database"],
  ({ database }) => ({
    // @ts-ignore
    lists: database.collections.get<List>("List").query(),
  })
);
type ListsProps = {
  lists: List[];
};
const Lists = enhance(({ lists }: ListsProps) => {
  return (
    <>
      {lists.map(i => {
        return <ListCard key={i.id} list={i} />;
      })}
    </>
  );
});
