import { LeftAccentCard } from "@/components/Cards";
import { Fab } from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import { withDB } from "@/db/models/withDB";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Database from "@nozbe/watermelondb/Database";
import { Icon, ScrollView, Text } from "native-base";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddListSheet } from "./AddListSheet";
import { ListStackScreenProps } from "./Stack";

export default function TaskListGroup(p: ListStackScreenProps<"Root">) {
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
type listCardProps = ListStackScreenProps<"Root"> & {
  list: List;
};
const RawListCard = ({ list, navigation }: listCardProps) => {
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
      <Text fontSize="md">5 Task left</Text>
    </LeftAccentCard>
  );
};

const ListCard = withDB<listCardProps, { list: List }>(
  RawListCard,
  ["list"],
  ({ list }) => ({
    list: list,
  })
);
type ListViewProps = ListStackScreenProps<"Root"> & {
  lists: List[];
  database: Database;
};
const RawListView = ({ lists, ...p }: ListViewProps) => {
  return (
    <>
      {lists.map(i => {
        return <ListCard key={i.id} {...p} list={i} />;
      })}
    </>
  );
};

const ListView = withDB<ListViewProps, { lists: List[] }>(
  RawListView,
  ["database"],
  ({ database }) => ({
    lists: database.get<List>(Tables.List).query(),
  })
);
