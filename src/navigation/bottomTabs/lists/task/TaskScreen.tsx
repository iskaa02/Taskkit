import CheckBox from "@/components/CheckBox";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import { Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { ListStackScreenProps } from "@/navigation/navPropsType";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Database from "@nozbe/watermelondb/Database";
import dayjs from "dayjs";
import {
  Box,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useColorModeValue,
} from "native-base";
import * as React from "react";
import EditHeaderButton from "../EditHeaderButton";
import { EditTaskSheet } from "./EditTaskSheet";
import { DateInfo, SubtaskSection } from "./TaskInfo";

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
  const secondary = useAccent(route.params.theme, { flip: true });
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
          onDeletePress={() => {
            database.write(async () => {
              await task.markAsDeleted();
            });
            navigation.goBack();
          }}
          name={task.name}
          tintColor={tintColor}
        />
      ),
    });
  }, [route.params]);
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
                <DateInfo
                  iconName="clock"
                  label={dayjs(task.reminder).format(
                    dayjs(task.reminder).isSame(Date.now(), "year")
                      ? "ddd, MMM D"
                      : "ddd, MMM D, YYYY"
                  )}
                />
                <DateInfo
                  iconName="calendar"
                  label={dayjs(task.reminder).format("h:m A")}
                />
                <DateInfo iconName="repeat" label="Every week" />
              </>
            ) : null}
          </Box>
          <SubtaskSection {...{ task, accent }} />
        </Box>
      </ScrollView>
      <Footer
        keyboardVisible={keyboardVisible}
        style={{ backgroundColor: secondary, elevation: 0 }}
        textStyle={{
          color: route.params.theme.secondary ? "em.1" : "em.10",
          fontSize: 18,
          bold: true,
        }}
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