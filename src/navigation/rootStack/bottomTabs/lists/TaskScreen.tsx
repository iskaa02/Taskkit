import CheckBox from "@/components/CheckBox";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";
import { AddSubtask, SubtaskCard } from "@/components/Subtasks";
import { database } from "@/db/db";
import { Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import { withDB } from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Database from "@nozbe/watermelondb/Database";
import dayjs from "dayjs";
import {
  Box,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useColorModeValue,
} from "native-base";
import * as React from "react";
import EditHeaderButton from "./EditHeaderButton";
import { EditTaskSheet } from "./EditTaskSheet";
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
  const sheetRef = React.useRef<BottomSheetModalMethods>(null);
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
          onDeletePress={() => {}}
          name={task.name}
          tintColor={tintColor}
        />
      ),
    });
  }, [route.params]);
  console.log(task.reminder);
  const keyboardVisible = useKeyboardStatus();
  const topCheckboxColor = useColorModeValue("#fff", "#000");
  return (
    <KeyboardAvoidingView bg="surface" flex={1}>
      <EditTaskSheet ref={sheetRef} task={task} />
      <StatusBar _dark={"dark-content"} _light={"light-content"} />
      <ScrollView
        _contentContainerStyle={{
          bg: "surface",
          pb: "90px",
          flexGrow: 1,
        }}
        stickyHeaderIndices={[0]}
      >
        <Box
          borderBottomWidth="1"
          borderBottomColor={"em.10"}
          bg={accent}
          px="20px"
          pb={3}
        >
          <Box flexDirection="row" alignItems="center">
            <CheckBox
              size={25}
              iconColor={accent}
              color={topCheckboxColor}
              value={task.isCompleted}
              onToggle={() => {}}
            />
            <Text
              bold
              color={"em.10"}
              fontSize="3xl"
              strikeThrough={task.isCompleted}
            >
              {task.name}
            </Text>
          </Box>
        </Box>
        {task.description ? (
          <Text py={3} bg={accent} px="20px" color={"em.10"} fontSize="md">
            {task.description}
          </Text>
        ) : null}
        <Box px="20px">
          <Box mt="4">
            {!!task.reminder?.valueOf() ? (
              <>
                <ExtraInfo
                  iconName="clock"
                  label={dayjs(task.reminder).format(
                    dayjs(task.reminder).isSame(Date.now(), "year")
                      ? "ddd, MMM D"
                      : "ddd, MMM D, YYYY"
                  )}
                />
                <ExtraInfo
                  iconName="calendar"
                  label={dayjs(task.reminder).format("h:m A")}
                />
                <ExtraInfo iconName="repeat" label="Every week" />
              </>
            ) : null}
          </Box>
          <SubtaskSection {...{ task, accent }} />
        </Box>
      </ScrollView>
      <Footer
        keyboardVisible={keyboardVisible}
        style={{ backgroundColor: accent, elevation: 0 }}
        textStyle={{ color: "em.10", fontSize: 18, bold: true }}
        label={`Mark as ${task.isCompleted ? "Uncompleted" : "Completed"}`}
        onPress={() => {
          task.toggleTask();
        }}
      />
    </KeyboardAvoidingView>
  );
};
const Screen = withDB<TaskScreenProps, { task: Task }>(
  RawScreen,
  ["database", "taskID"],
  ({ database, taskID }) => {
    return {
      task: database.get<Task>(Tables.Task).findAndObserve(taskID),
    };
  }
);

type ExtraInfoProps = {
  iconName: string;
  label: string;
};
const ExtraInfo = ({ iconName, label }: ExtraInfoProps) => {
  if (label == "") return null;
  return (
    <Box mb="3" py="1" flexDir="row" alignItems="center">
      <Icon
        style={{ marginEnd: 20 }}
        as={<Feather />}
        name={iconName}
        color="em.2"
        size="22px"
      />
      <Text fontSize="md" color="em.2">
        {label}
      </Text>
    </Box>
  );
};

const SubtaskSection = ({ task, accent }: { task: Task; accent: string }) => {
  return (
    <>
      <Text mt={4} bold color="em.1" fontSize="2xl">
        SubTasks
      </Text>
      <Box mt={3}>
        {Object.keys(task.subtasks).map(i => {
          const v = task.subtasks[i];
          return (
            <SubtaskCard
              {...v}
              color={accent}
              key={v.id}
              changeSubtaskName={name => task.changeSubtaskName(v.id, name)}
              onToggle={() => task.toggleSubtask(v.id)}
              onDelete={() => task.deleteSubtask(v.id)}
            />
          );
        })}
      </Box>
      <AddSubtask
        onAdd={i => {
          if (i.replaceAll(" ", "") !== "") task.addSubTask(i);
        }}
        color={accent}
      />
    </>
  );
};
