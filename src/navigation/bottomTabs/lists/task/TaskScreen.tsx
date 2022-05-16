import CheckBox from "@/components/CheckBox";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";
import Switch from "@/components/Switch";
import { database } from "@/db/db";
import { Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { ListStackScreenProps } from "@/navigation/navPropsType";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Database from "@nozbe/watermelondb/Database";
import {
  Box,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useColorModeValue,
} from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import EditHeaderButton from "../EditHeaderButton";
import Description from "./Description";
import { EditTaskSheet } from "./EditTaskSheet";
import TaskDateSection, { SubtaskSection } from "./TaskInfo";

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
  }, [route.params, navigation]);
  const keyboardVisible = useKeyboardStatus();
  const topCheckboxColor = useColorModeValue("#fff", "#000");
  const { t } = useTranslation();
  return (
    <KeyboardAvoidingView bg="background" flex={1}>
      <EditTaskSheet ref={sheetRef} task={task} />
      <StatusBar _dark={"dark-content"} _light={"light-content"} />
      <ScrollView
        _contentContainerStyle={{
          bg: "background",
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
            <Box alignSelf="flex-start" pt="1">
              <CheckBox
                size={25}
                iconColor={accent}
                color={topCheckboxColor}
                value={task.isCompleted}
                onToggle={() => {}}
              />
            </Box>

            <Input
              fontSize="3xl"
              fontWeight="bold"
              variant="unstyled"
              textAlign="left"
              color="em.10"
              textDecorationLine={task.isCompleted ? "line-through" : undefined}
              defaultValue={task.name}
              textBreakStrategy="balanced"
              multiline
              blurOnSubmit
              onEndEditing={e => {
                task.editTask({ name: e.nativeEvent.text });
              }}
              p="0"
            />
          </Box>
        </Box>
        <Description
          onChange={description => {
            task.editTask({ description });
          }}
          accent={accent}
          text={task.description}
        />
        <Box px="20px">
          <Box mt="4">
            <Box mb={2} flexDir="row" justifyContent="space-between">
              <Text bold color="em.1" fontSize="2xl">
                {t("reminders")}
              </Text>
              <Switch
                value={!!task.reminder}
                onValueChange={i => {
                  if (i) {
                    task.editTask({ reminder: new Date(Date.now()) });
                  } else {
                    task.editTask({ reminder: null, repeat: null });
                  }
                }}
              />
            </Box>
            <TaskDateSection
              task={task}
              reminder={task.reminder}
              repeat={task.repeat}
            />
          </Box>
          <SubtaskSection {...{ accent, task }} />
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
        label={
          !task.isCompleted ? t("mark-as-completed") : t("mark-as-uncompleted")
        }
        onPress={() => {
          task.setIsCompleted(!task.isCompleted);
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
