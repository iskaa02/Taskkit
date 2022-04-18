import { AddSubtask, SubtaskCard } from "@/components/Subtasks";
import Task from "@/db/models/Task";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AnimatePresence, MotiView } from "moti";
import { Box, Icon, Text } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import useSubtaskReducer from "./SubtasksReducer";

type ExtraInfoProps = {
  iconName: string;
  label: string;
  index: number;
};
export const DateInfo = ({ iconName, label, index }: ExtraInfoProps) => {
  if (label == "") return null;
  return (
    <MotiView
      animate={{ bottom: 0, opacity: 1 }}
      from={{ opacity: 0.5, bottom: 18 }}
      transition={{ damping: 25, delay: index * 90 }}
    >
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
    </MotiView>
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
