import { Fab } from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import TaskCard from "@/components/TaskCard";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import { withDB } from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import { Feather } from "@expo/vector-icons";
import { Q } from "@nozbe/watermelondb";
import Database from "@nozbe/watermelondb/Database";
import { Box, Icon, Text, useColorModeValue } from "native-base";
import * as React from "react";
import { ScrollView } from "react-native";
import { ListStackScreenProps } from "./Stack";

type ListScreenProps = ListStackScreenProps<"List"> & {
  list: List;
  listID: string;
  database: Database;
  tasks: Task[];
};
const RawScreen = ({ list, navigation, tasks }: ListScreenProps) => {
  const tintColor = useColorModeValue("#fff", "#000");
  const accent = useAccent(list.theme);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: accent,
      },
      headerTintColor: tintColor,
    });
  }, []);
  return (
    <>
      <ScrollView
        style={{ backgroundColor: accent }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box bg="background" flex={1}>
          <StatusBar _dark={"dark-content"} _light={"light-content"} />
          <Box bg={accent} px="20px" pb="20px">
            <Text bold color="em.10" fontSize={32}>
              {list.name}
            </Text>

            <Text mt={4} color={"em.10"} fontSize={16}>
              5 Tasks left 3 completed
            </Text>
          </Box>

          <Box mt={4} px="20px">
            <Text bold color="em.2" fontSize={26}>
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
        style={{ backgroundColor: accent }}
        onPress={() => {
          navigation.push("AddTask", { defaultList: list.id });
        }}
      >
        <Icon as={<Feather name="plus" />} color={tintColor} />
      </Fab>
    </>
  );
};

const Screen = withDB<ListScreenProps, { tasks: Task[]; list: List }>(
  RawScreen,
  ["listID", "database"],
  ({ listID, database }) => ({
    list: database.get<List>(Tables.List).findAndObserve(listID),
    tasks: database.get<Task>(Tables.Task).query(Q.where("list_id", listID)),
  })
);

export default function TaskListScreen(p: ListStackScreenProps<"List">) {
  return <Screen database={database} listID={p.route.params.listID} {...p} />;
}
