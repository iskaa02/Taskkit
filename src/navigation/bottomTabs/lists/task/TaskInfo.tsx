import SelectRepeatSheet from "@/components/SelectRepeatSheet";
import { AddSubtask, SubtaskCard } from "@/components/Subtasks";
import { repeatType } from "@/db/models/scheduleNotification";
import Task from "@/db/models/Task";
import { uid } from "@/db/models/uid";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import produce from "immer";
import { AnimatePresence } from "moti";
import { Box, Icon, Text, useColorModeValue, useTheme } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

type TaskDateSectionProps = {
  reminder: Date | null;
  repeat: repeatType;
  task: Task;
};
export default function TaskDateSection({
  reminder,
  repeat,
  task,
}: TaskDateSectionProps) {
  const { t } = useTranslation();
  const sheetRef = React.useRef<BottomSheetModal>(null);
  if (!reminder) {
    return (
      <Box mb="10px">
        <Text fontSize="md">{t("no-reminder-set")}</Text>
      </Box>
    );
  }
  return (
    <>
      <Box flexDir="row" justifyContent="space-between" flexWrap="wrap">
        <ReminderButton
          isDisabled={!reminder}
          iconName="calendar"
          onPress={() => {
            DateTimePickerAndroid.open({
              mode: "date",
              value: reminder,
              minimumDate: new Date(Date.now()),
              onChange: (e, d) => {
                if (e.type == "set") {
                  task.editTask({
                    reminder: d,
                  });
                }
              },
            });
          }}
          label={dayjs(reminder).format(
            dayjs(reminder).isSame(Date.now(), "year")
              ? "ddd, MMM D"
              : "ddd, MMM D, YYYY"
          )}
        />
        <ReminderButton
          onPress={() => {
            DateTimePickerAndroid.open({
              mode: "time",
              value: reminder,
              minimumDate: new Date(Date.now()),
              onChange: (e, d) => {
                if (e.type == "set") {
                  task.editTask({
                    reminder: d,
                  });
                }
              },
            });
          }}
          isDisabled={!reminder}
          iconName="clock"
          label={dayjs(reminder).format("h:mm A")}
        />
        <ReminderButton
          onPress={() => {
            sheetRef.current?.present();
          }}
          isDisabled={!reminder}
          iconName="repeat"
          label={t(repeat ? `r-${repeat}` : "none")}
        />
        <SelectRepeatSheet
          onChange={repeat => {
            task.editTask({ repeat });
          }}
          date={reminder}
          initialRepeat={repeat}
          ref={sheetRef}
        />
      </Box>
    </>
  );
}
type ReminderButtonProps = {
  iconName: string;
  label: string;
  isDisabled?: boolean;
  onPress: () => void;
};
const ReminderButton = ({
  iconName,
  label,
  isDisabled,
  onPress,
}: ReminderButtonProps) => {
  const { surface } = useTheme().colors;
  const borderColor = useColorModeValue("#eaeaea", "#787878");
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginBottom: 10,
        backgroundColor: surface,
        alignItems: "center",
        paddingHorizontal: 10,
        width: "49%",
        height: 50,
        borderRadius: 10,
        flexDirection: "row",
        opacity: isDisabled ? 0.7 : 1,
        borderWidth: 1,
        borderColor,
      }}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <Icon
        as={Feather}
        style={{ marginEnd: 8 }}
        name={iconName}
        color="em.2"
        size="20px"
      />
      <Text flex={1} isTruncated fontSize="md" color="em.2">
        {label}
      </Text>
    </TouchableOpacity>
  );
};
type SubtaskSectionProps = {
  task: Task;
  accent: string;
};

export const SubtaskSection = ({ accent, task }: SubtaskSectionProps) => {
  const { t } = useTranslation();
  return (
    <Box mb="10">
      <Text mt={4} bold color="em.1" fontSize="2xl">
        {t("subtask", { count: 1 })}
      </Text>
      <Box mt={3}>
        <AnimatePresence key={task.id}>
          {Object.keys(task.subtasks).map((key, i) => {
            const v = task.subtasks[key];
            return (
              <SubtaskCard
                {...v}
                index={i}
                color={accent}
                key={key}
                onEndEditing={name => {
                  task.updateSubtasks(
                    produce(task.subtasks, s => {
                      if (name) {
                        s[key].name = name;
                      } else {
                        delete s[key];
                      }
                    })
                  );
                }}
                onToggle={() => {
                  task.updateSubtasks(
                    produce(task.subtasks, s => {
                      s[key].isCompleted = !s[key].isCompleted;
                    })
                  );
                }}
                onDelete={() => {
                  task.updateSubtasks(
                    produce(task.subtasks, s => {
                      delete s[key];
                    })
                  );
                }}
              />
            );
          })}
        </AnimatePresence>
      </Box>
      <AddSubtask
        onAdd={name => {
          if (name.replaceAll(" ", "") !== "")
            task.updateSubtasks(
              produce(task.subtasks, s => {
                s[uid(10)] = { name, isCompleted: false };
              })
            );
        }}
        color={accent}
      />
    </Box>
  );
};
