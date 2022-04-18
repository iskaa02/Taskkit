import Fab from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import TaskCard from "@/components/TaskCard";
import { database } from "@/db/db";
import { Columns, Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import {
  RootTabScreenProps,
  useNavigationProps,
} from "@/navigation/navPropsType";
import { Q } from "@nozbe/watermelondb";
import Database from "@nozbe/watermelondb/Database";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Box, Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
type HomeScreenProps = RootTabScreenProps<"Home"> & {
  todayTasks: Task[];
  futureTasks: Task[];
  database: Database;
};
function RawScreen({ todayTasks, futureTasks }: HomeScreenProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<useNavigationProps>();
  return (
    <Box flex={1}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <StatusBar animated />
        <Box px="20px" mt="5">
          {todayTasks.length === 0 ? null : (
            <Box mb="3">
              <Text textAlign="justify" fontSize="xl" bold>
                {t("today-tasks")}
              </Text>
            </Box>
          )}
          {todayTasks.map(task => (
            <TaskCard
              key={task.id}
              onPress={async () => {
                const list = await task.list.fetch();
                if (!list) return;
                navigation.navigate("Task", {
                  theme: list.theme,
                  taskID: task.id,
                });
              }}
              task={task}
              withList
              withTime
            />
          ))}

          {futureTasks.length === 0 ? null : (
            <Box my="3">
              <Text textAlign="justify" fontSize="xl" bold>
                {t("next-week-tasks")}
              </Text>
            </Box>
          )}
          {futureTasks.map(task => (
            <TaskCard
              onPress={() => {}}
              task={task}
              key={task.id}
              withList
              withDate
              withTime
            />
          ))}
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
        Q.lte(dayjs().startOf("day").add(1, "day").valueOf())
      )
    ),
  futureTasks: database
    .get<Task>(Tables.Task)
    .query(
      Q.where(
        Columns.task.reminder,
        Q.gte(dayjs().add(1, "day").startOf("day").valueOf())
      ),
      Q.where(
        Columns.task.reminder,
        Q.lte(dayjs().startOf("day").add(5, "day").valueOf())
      )
    ),
}));
export default function HomeScreenProps(p: RootTabScreenProps<"Home">) {
  return <Screen database={database} {...p} />;
}
