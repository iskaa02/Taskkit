import Fab from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import TaskCard from "@/components/TaskCard";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import { getIntervalDate as getDateHelper, queryTasks } from "@/db/queries";
import {
  RootTabScreenProps,
  useNavigationProps,
} from "@/navigation/navPropsType";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Box, Icon, Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { SectionList, TouchableOpacity } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

export default function RawScreen({}: RootTabScreenProps<"Home">) {
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
  return (
    <Box flex={1}>
      <StatusBar />
      <Section />
      <Fab onPress={() => navigation.push("AddTask")} />
    </Box>
  );
}

type TaskSectionListProps = {
  today: Task[];
  upcoming: Task[];
  tomorrow: Task[];
  other: Task[];
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
  [],
  () => ({
    today: queryTasks(getDateHelper({ day: dayjs().valueOf() })),
    tomorrow: queryTasks(
      getDateHelper({ day: dayjs().add(1, "day").valueOf() })
    ),
    upcoming: queryTasks(getDateHelper({ afterDays: 2 })),
    other: queryTasks({
      ...getDateHelper({ beforeDays: 1 }),
      withNull: true,
    }),
  })
);
