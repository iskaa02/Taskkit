import Fab from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import { Columns, Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import { RootTabScreenProps } from "@/navigation/navPropsType";
import { Q } from "@nozbe/watermelondb";
import Database from "@nozbe/watermelondb/Database";
import dayjs from "dayjs";
import { Box, Text } from "native-base";
import React from "react";
import { ScrollView } from "react-native";
type HomeScreenProps = RootTabScreenProps<"Home"> & {
  todayTasks: Task[];
  futureTasks: Task[];
  database: Database;
};
function RawScreen({ todayTasks, navigation }: HomeScreenProps) {
  const countString = (() => {
    let completed = 0;
    let left = 0;
    todayTasks.map(task => {
      task.isCompleted ? completed++ : left++;
    });
    let s = "";
    left > 0
      ? (s += `${left} Tasks Left For Today`)
      : (s = "No Tasks Left For Today");

    return s;
  })();
  return (
    <Box flex={1}>
      <ScrollView>
        <StatusBar animated />
        <Box shadow={2} pb={2} px={5} bg="surface">
          <Text fontSize="lg">Hello</Text>
          <Text fontSize="3xl" fontWeight="bold">
            ISKAA
          </Text>
          <Text fontSize="xl" fontWeight="semibold">
            {countString}
          </Text>
        </Box>
      </ScrollView>
      <Fab onPress={() => navigation.push("AddTask")} />
    </Box>
  );
}
const Screen = withDB<
  HomeScreenProps,
  { todayTasks: Task[]; futureTasks: Task[] }
>(RawScreen, ["database"], ({ database }) => ({
  todayTasks: database
    .get<Task>(Tables.Task)
    .query(
      Q.where(Columns.task.reminder, Q.gte(dayjs().startOf("day").valueOf())),
      Q.where(
        Columns.task.reminder,
        Q.lte(dayjs().startOf("day").add(5, "day").valueOf())
      )
    ),
  futureTasks: database
    .get<Task>(Tables.Task)
    .query(
      Q.where(Columns.task.reminder, Q.gte(dayjs().startOf("day").valueOf())),
      Q.where(
        Columns.task.reminder,
        Q.lte(dayjs().startOf("day").add(5, "day").valueOf())
      )
    ),
}));
export default function HomeScreenProps(p: RootTabScreenProps<"Home">) {
  return <Screen database={database} {...p} />;
}
