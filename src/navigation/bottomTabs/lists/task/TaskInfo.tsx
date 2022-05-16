import { AddSubtask, SubtaskCard } from "@/components/Subtasks";
import { repeatType } from "@/db/models/scheduleNotification";
import Task from "@/db/models/Task";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { AnimatePresence } from "moti";
import { Box, Icon, Text, useColorModeValue, useTheme } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import useSubtaskReducer from "./SubtasksReducer";

type ExtraInfoProps = {
  iconName: string;
  label: string;
  isDisabled?: boolean;
};
type TaskDateSectionProps = {
  reminder: Date | null;
  repeat: repeatType;
};
export default function TaskDateSection({
  reminder,
  repeat,
}: TaskDateSectionProps) {
  const { t } = useTranslation();
  return (
    <>
      <Box flexDir="row" justifyContent="space-between" flexWrap="wrap">
        <ReminderButton
          isDisabled={!reminder}
          iconName="calendar"
          label={dayjs(reminder ?? undefined).format(
            dayjs(reminder ?? undefined).isSame(Date.now(), "year")
              ? "ddd, MMM D"
              : "ddd, MMM D, YYYY"
          )}
        />
        <ReminderButton
          isDisabled={!reminder}
          iconName="clock"
          label={dayjs(reminder ?? undefined).format("h:mm A")}
        />
        <ReminderButton
          isDisabled={!reminder}
          iconName="repeat"
          label={t(repeat ? `r-${repeat}` : "none")}
        />
      </Box>
    </>
  );
}
const ReminderButton = ({ iconName, label, isDisabled }: ExtraInfoProps) => {
  const { surface } = useTheme().colors;
  const borderColor = useColorModeValue("#eaeaea", "#787878");
  return (
    <TouchableOpacity
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
  const { subtasks, actions, setSubtasks } = useSubtaskReducer(task.subtasks);
  const nav = useNavigation();
  React.useEffect(() => {
    return () => {
      nav.addListener("blur", () => {
        setSubtasks(s => {
          if (!(s === subtasks)) task.updateSubtasks(s);
          return s;
        });
      });
    };
  }, []);
  return (
    <>
      <Text mt={4} bold color="em.1" fontSize="2xl">
        {t("subtask", { count: 1 })}
      </Text>
      <Box mt={3}>
        <AnimatePresence>
          {Object.keys(subtasks).map((key, i) => {
            const v = subtasks[key];
            return (
              <SubtaskCard
                {...v}
                index={i}
                color={accent}
                key={key}
                onEndEditing={name => {
                  actions.renameSubtask(key, name);
                }}
                onToggle={() => {
                  actions.toggleSubtask(key);
                }}
                onDelete={() => {
                  actions.deleteSubtask(key);
                }}
              />
            );
          })}
        </AnimatePresence>
      </Box>
      <AddSubtask
        onAdd={name => {
          if (name.replaceAll(" ", "") !== "") actions.addSubtask(name);
        }}
        color={accent}
      />
    </>
  );
};
