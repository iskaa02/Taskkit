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
import { Feather } from "@expo/vector-icons";
import { Q } from "@nozbe/watermelondb";
import Database from "@nozbe/watermelondb/Database";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Box, Icon, Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { SectionList, TouchableOpacity } from "react-native";
type HomeScreenProps = RootTabScreenProps<"Home">;
export default function RawScreen({}: HomeScreenProps) {
  const navigation = useNavigation<useNavigationProps>();
  return (
    <Box flex={1}>
      <StatusBar />
      <Section database={database} />
      <Fab onPress={() => navigation.push("AddTask")} />
    </Box>
  );
}

type TaskSectionListProps = {
  today: Task[];
  upcoming: Task[];
  tomorrow: Task[];
  other: Task[];
  database: Database;
};
const RawSection = ({
  today,
  upcoming,
  tomorrow,
  other,
}: TaskSectionListProps) => {
  const { t } = useTranslation();
  const nav = useNavigation<useNavigationProps>();
  const onPress = React.useCallback(async (task: Task) => {
    const list = await task.list.fetch();
    if (!list) return;
    nav.navigate("Task", { taskID: task.id, theme: list.theme });
  }, []);
  return (
    <SectionList
      sections={[
        { data: today, key: "today" },
        { data: tomorrow, key: "tomorrow" },
        { data: upcoming, key: "upcoming" },
        { data: other, key: "other" },
      ]}
      getItemLayout={(_, index) => {
        const itemHeight = 70 + 10 + 15;
        return { length: itemHeight, offset: itemHeight * index, index };
      }}
      style={{
        paddingHorizontal: 20,
      }}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 90,
      }}
      renderSectionHeader={({ section }) => {
        if (
          (section.key === "other" || section.key === "upcoming") &&
          section.data.length == 0
        )
          return null;
        return (
          <Box
            py="1"
            mb="2"
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            bg="background"
          >
            <Text textAlign="justify" fontSize="xl" bold>
              {t(section.key)}
            </Text>
            {section.key !== "other" && section.key !== "upcoming" && (
              <TouchableOpacity
                activeOpacity={0.4}
                style={{ padding: 8 }}
                onPress={() =>
                  nav.push("AddTask", {
                    date: dayjs()
                      .add(section.key == "today" ? 0 : 1, "day")
                      .valueOf(),
                  })
                }
              >
                <Icon size={19} color="em.1" as={<Feather name="plus" />} />
              </TouchableOpacity>
            )}
          </Box>
        );
      }}
      renderItem={({ item: task, section }) => (
        <TaskCard
          onPress={() => {
            onPress(task);
          }}
          task={task}
          key={task.id}
        />
      )}
      stickySectionHeadersEnabled
    />
  );
};

const Section = withDB<TaskSectionListProps, TaskSectionListProps>(
  RawSection,
  ["database"],
  ({ database }) => ({
    today: database
      .get<Task>(Tables.Task)
      .query(
        Q.where(Columns.task.reminder, Q.gte(dayjs().startOf("day").valueOf())),
        Q.where(
          Columns.task.reminder,
          Q.lte(dayjs().startOf("day").add(1, "day").valueOf())
        )
      ),
    tomorrow: database
      .get<Task>(Tables.Task)
      .query(
        Q.where(
          Columns.task.reminder,
          Q.between(
            dayjs().add(1, "day").startOf("day").valueOf(),
            dayjs().endOf("day").add(1, "day").valueOf()
          )
        )
      ),
    upcoming: database
      .get<Task>(Tables.Task)
      .query(
        Q.where(
          Columns.task.reminder,
          Q.gte(dayjs().add(2, "day").startOf("day").valueOf())
        )
      ),
    other: database
      .get<Task>(Tables.Task)
      .query(
        Q.or(
          Q.where(
            Columns.task.reminder,
            Q.lte(dayjs().subtract(1, "day").endOf("day").valueOf())
          ),
          Q.where(Columns.task.reminder, Q.eq(null))
        )
      ),
  })
);
