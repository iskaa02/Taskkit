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
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useColorModeValue,
} from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
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

            <Heading
              color={"em.10"}
              strikeThrough={task.isCompleted}
              textBreakStrategy="balanced"
            >
              {task.name}
            </Heading>
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
                  index={0}
                  iconName="calendar"
                  label={dayjs(task.reminder).format(
                    dayjs(task.reminder).isSame(Date.now(), "year")
                      ? "ddd, MMM D"
                      : "ddd, MMM D, YYYY"
                  )}
                />
                <DateInfo
                  index={1}
                  iconName="clock"
                  label={dayjs(task.reminder).format("h:mm A")}
                />
                {!task.repeat ? null : (
                  <DateInfo
                    index={2}
                    iconName="repeat"
                    label={t("r-" + task.repeat)}
                  />
                )}
              </>
            ) : null}
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
