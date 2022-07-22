import CheckBox from "@/components/CheckBox";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";
import Switch from "@/components/Switch";
import { database } from "@/db/db";
import { Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import { storage } from "@/db/storage";
import useAccent from "@/hooks/useAccent";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { ListStackScreenProps } from "@/navigation/navPropsType";
import Database from "@nozbe/watermelondb/Database";
import {
  Box,
  Button,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useColorModeValue,
} from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Alert, I18nManager } from "react-native";
import ChangeList from "./ChangeList";
import Description from "./Description";
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
  const theme = route.params.theme;
  const accent = useAccent(theme);
  const secondary = useAccent(theme, { flip: true });
  const keyboardVisible = useKeyboardStatus();
  const { t } = useTranslation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: accent,
      },
      headerTintColor: tintColor,
    });
  }, [theme, navigation, tintColor]);

  return (
    <KeyboardAvoidingView bg="background" flex={1}>
      <StatusBar _dark={"dark-content"} _light={"light-content"} />
      <ScrollView
        _contentContainerStyle={{
          bg: "background",
          pb: "90px",
          flexGrow: 1,
        }}
        // stickyHeaderIndices={[0]}
      >
        <ScreenHeader {...{ task, accent }} />
        <Description
          onChange={description => {
            task.editTask({ description });
          }}
          accent={accent}
          text={task.description}
        />
        <Box px="20px" mt="4">
          <Box mb={2} flexDir="row" justifyContent="space-between">
            <Text bold color="em.1" fontSize="2xl">
              {t("reminder")}
            </Text>
            <Switch
              value={!!task.reminder}
              color={accent}
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
          <ChangeList
            afterChange={async () => {
              const list = await task.list.fetch();
              if (list)
                //@ts-ignore
                navigation.setParams({
                  theme: list.theme,
                  taskID: task.id,
                });
            }}
            task={task}
          />
          <SubtaskSection {...{ accent, task }} />
        </Box>
        <Button
          mt="auto"
          rounded="xl"
          h="54px"
          colorScheme="red"
          // _pressed={{ bg: "transparent" }}
          variant="outline"
          mx="20px"
          size="lg"
          onPress={async () => {
            const shouldWarn = storage.getBoolean("warn-before-delete");
            if (shouldWarn) {
              Alert.alert(
                `${t("delete")} "${task.name}" ${t("?")}`,
                t("delete-confirmation"),
                [
                  { text: t("cancel") },
                  {
                    text: t("delete"),
                    onPress: async () => {
                      await task.markAsDeleted().then(() => {
                        navigation.pop();
                      });
                    },
                  },
                ],
                { cancelable: true }
              );
            } else {
              await task.markAsDeleted().then(() => {
                navigation.pop();
              });
            }
          }}
        >
          {t("delete")}
        </Button>
      </ScrollView>
      <Footer
        containerBg="background"
        keyboardVisible={keyboardVisible}
        style={{ backgroundColor: secondary, elevation: 0 }}
        textStyle={{
          color: theme ? "em.1" : "em.10",
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
type ScreenHeaderProps = {
  accent: string;
  task: Task;
};
const ScreenHeader = ({ task, accent }: ScreenHeaderProps) => {
  const tintColor = useColorModeValue("#fff", "#000");
  return (
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
            color={tintColor}
            value={task.isCompleted}
            onToggle={() => {}}
          />
        </Box>

        <Input
          fontSize="3xl"
          fontWeight="bold"
          variant="unstyled"
          textAlign={I18nManager.isRTL ? "right" : "left"}
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
  );
};
