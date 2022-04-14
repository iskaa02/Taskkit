import Fab from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import TaskCard from "@/components/TaskCard";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import { ListStackScreenProps } from "@/navigation/navPropsType";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Q } from "@nozbe/watermelondb";
import Database from "@nozbe/watermelondb/Database";
import { Box, Icon, Text, useColorModeValue } from "native-base";
import * as React from "react";
import { ScrollView } from "react-native";
import EditHeaderButton from "../EditHeaderButton";
import { EditListSheet } from "./EditListSheet";

type ListScreenProps = ListStackScreenProps<"List"> & {
  list: List;
  listID: string;
  database: Database;
  tasks: Task[];
};
const RawListScreen = ({ list, navigation, tasks }: ListScreenProps) => {
  const tintColor = useColorModeValue("#fff", "#000");
  const accent = useAccent(list.theme);
  const secondary = useAccent(list.theme, { flip: true });
  const sheetRef = React.useRef<BottomSheetModalMethods>(null);
  const countString = (() => {
    let completed = 0;
    let left = 0;
    tasks.map(task => {
      task.isCompleted ? completed++ : left++;
    });
    let s = "";
    left > 0 ? (s += `${left} Tasks Left`) : "No Tasks Left";
    if (completed > 0) s += ` ${completed} Completed`;
    return s;
  })();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: accent,
      },
      headerTintColor: tintColor,
      headerRight: () => (
        <EditHeaderButton
          onEditPress={() => {
            sheetRef.current?.present();
          }}
          onDeletePress={() => {
            list.markAsDeleted();
            navigation.goBack();
          }}
          name={list.name}
          tintColor={tintColor}
        />
      ),
    });
  }, [list.theme]);
  return (
    <>
      <ScrollView
        style={{ backgroundColor: accent }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box bg="background" flex={1}>
          <StatusBar _dark={"dark-content"} _light={"light-content"} />
          <Box bg={accent} px="20px" pb="20px">
            <Text bold color="em.10" fontSize="3xl">
              {list.name}
            </Text>

            <Text mt={4} color={"em.10"} fontSize="md">
              {countString}
            </Text>
          </Box>

          <Box mt={4} px="20px">
            <Text bold color="em.2" fontSize="2xl">
              Tasks
            </Text>
            {tasks.map(i => {
              return (
                <TaskCard
                  key={i.id}
                  theme={list.theme}
                  task={i}
                  onPress={() =>
                    navigation.push("Task", { theme: list.theme, taskID: i.id })
                  }
                />
              );
            })}
          </Box>
        </Box>
      </ScrollView>
      <Fab
        style={{ backgroundColor: secondary }}
        onPress={() => {
          navigation.push("AddTask", { defaultList: list.id });
        }}
      >
        <Icon
          as={<Feather name="plus" />}
          color={list.theme.secondary ? "em.1" : "em.10"}
        />
      </Fab>
      <EditListSheet ref={sheetRef} list={list} />
    </>
  );
};

const Screen = withDB<ListScreenProps, { tasks: Task[]; list: List }>(
  RawListScreen,
  ["listID", "database"],
  ({ listID, database }) => ({
    list: database.get<List>(Tables.List).findAndObserve(listID),
    tasks: database.get<Task>(Tables.Task).query(Q.where("list_id", listID)),
  })
);

export default function TaskListScreen(p: ListStackScreenProps<"List">) {
  return <Screen database={database} listID={p.route.params.listID} {...p} />;
}
