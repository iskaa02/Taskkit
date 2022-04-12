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
import { ScreenProps } from "./ListStackType";

export default function ListRoot(p: ScreenProps<"Root">) {
  const addListRef = React.useRef<BottomSheetModalMethods>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView px="10px">
        <Text fontSize={32} mx="10px" my="3" bold color="em.1">
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
        <Text color="em.1" fontSize={16} bold>
          Add List
        </Text>
      </Fab>
      <AddListSheet ref={addListRef} />
    </SafeAreaView>
  );
}
type listCardProps = CommonScreenProps<"Root"> & {
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
      <Text fontSize={20} bold>
        {list.name}
      </Text>
      <Text fontSize={16}>5 Task left</Text>
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
type ListViewProps = CommonScreenProps<"Root"> & {
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