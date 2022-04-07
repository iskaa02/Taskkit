import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import { Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import { withDB } from "@/db/models/utils";
import useAccent from "@/hooks/useAccent";
import { Feather } from "@expo/vector-icons";
import Database from "@nozbe/watermelondb/Database";
import dayjs from "dayjs";
import {
  Box,
  Icon,
  Text,
  useColorModeValue,
  useTheme,
  VStack,
} from "native-base";
import * as React from "react";
import { ScrollView } from "react-native";
import { ListStackScreenProps } from "./Stack";
export default function TaskScreen(p: ListStackScreenProps<"Task">) {
  return <Screen database={database} taskID={p.route.params.taskID} {...p} />;
}
type TaskScreenProps = ListStackScreenProps<"Task"> & {
  task: Task;
  database: Database;
  taskID: string;
};
const RawScreen = ({ navigation, route, task }: TaskScreenProps) => {
  const tintColor = useColorModeValue("#fff", "#000");
  const accent = useAccent(route.params.theme);
  const surface = useTheme().colors.surface;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: accent,
      },
      headerTintColor: tintColor,
    });
  }, [route.params]);
  return (
    <ScrollView
      style={{ backgroundColor: surface }}
      contentContainerStyle={{ flex: 1 }}
    >
      <Box bg="surface" flex={1}>
        <StatusBar _dark={"dark-content"} _light={"light-content"} />
        <Box bg={accent} px="20px" pb="20px">
          <Text bold color={"em.10"} fontSize={32}>
            {task.name}
          </Text>

          <Text mt={4} color={"em.10"} fontSize={16}>
            {task.description}
          </Text>
        </Box>

        <Box px="20px">
          <VStack space={4} mt={4}>
            <ExtraInfo
              iconName="clock"
              label={dayjs(task.reminder).format("")}
            />
            <ExtraInfo
              iconName="calendar"
              label={dayjs(task.reminder).format("")}
            />
            <ExtraInfo iconName="repeat" label="Every week" />
          </VStack>
          <Text mt={7} bold color="em.1" fontSize={22}>
            SubTasks
          </Text>
        </Box>
      </Box>
    </ScrollView>
  );
};
type ExtraInfoProps = {
  iconName: string;
  label: string;
};
const ExtraInfo = ({ iconName, label }: ExtraInfoProps) => {
  if (label == "") return null;
  return (
    <Box py="1" flexDir="row" alignItems="center">
      <Icon
        style={{ marginEnd: 20 }}
        as={<Feather />}
        name={iconName}
        color="em.2"
        size="22px"
      />
      <Text fontSize={16} color="em.2">
        {label}
      </Text>
    </Box>
  );
};

const Screen = withDB<TaskScreenProps, { task: Task }>(
  RawScreen,
  ["database", "taskID"],
  ({ database, taskID }) => {
    return {
      task: database.get<Task>(Tables.Task).find(taskID),
    };
  }
);
