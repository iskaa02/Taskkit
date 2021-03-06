import Fab from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import TaskCard from "@/components/TaskCard";
import { Columns } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import { getIntervalDate as getDateHelper, queryTasks } from "@/db/queries";
import {
  RootTabScreenProps,
  useNavigationProps,
} from "@/navigation/navPropsType";
import { Feather } from "@expo/vector-icons";
import { Q } from "@nozbe/watermelondb";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Box, Icon, Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { SectionList, TouchableOpacity } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

export default function HomeScreen({}: RootTabScreenProps<"Home">) {
  const navigation = useNavigation<useNavigationProps>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: i => (
        <HeaderButtons>
          <Item
            color={i.tintColor}
            iconName="compass"
            iconSize={23}
            style={{ marginEnd: 10 }}
            IconComponent={Feather}
            title="Overview"
            onPress={() => navigation.push("Overview")}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);
  const [tasksWithoutDateAsToday] = useMMKVBoolean(
    "tasks-without-date-as-today"
  );
  return (
    <Box flex={1}>
      <StatusBar />
      <Section options={{ tasksWithoutDateAsToday }} />
      <Fab onPress={() => navigation.push("AddTask")} />
    </Box>
  );
}

type TaskSectionListProps = {
  today: Task[];
  upcoming: Task[];
  tomorrow: Task[];
  other: Task[];
  options: options;
};
type options = {
  tasksWithoutDateAsToday?: boolean;
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
            <Text
              color="blue.400"
              _light={{ color: "blue.500" }}
              textAlign="justify"
              fontSize="xl"
              bold
            >
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
                <Icon
                  _light={{ color: "blue.500" }}
                  size={19}
                  color="blue.400"
                  as={Feather}
                  name="plus"
                />
              </TouchableOpacity>
            )}
          </Box>
        );
      }}
      renderItem={({ item: task }) => (
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
  ["options"],
  ({ options }) => ({
    today: queryTasks(
      {
        ...getDateHelper({ day: dayjs().valueOf() }),
        withNull: options.tasksWithoutDateAsToday,
      },
      Q.sortBy(Columns.task.reminder, "asc")
    ),
    tomorrow: queryTasks(
      getDateHelper({ day: dayjs().add(1, "day").valueOf() }),
      Q.sortBy(Columns.task.reminder, "asc")
    ),
    upcoming: queryTasks(
      getDateHelper({ afterDays: 2 }),
      Q.sortBy(Columns.task.reminder, "asc")
    ),
    other: queryTasks({
      ...getDateHelper({ beforeDays: 1 }),
      withNull: !options.tasksWithoutDateAsToday,
    }),
  })
);
