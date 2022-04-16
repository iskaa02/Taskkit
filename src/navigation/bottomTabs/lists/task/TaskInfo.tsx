import { AddSubtask, SubtaskCard } from "@/components/Subtasks";
import Task from "@/db/models/Task";
import { Feather } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import { Box, Icon, Text } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";

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
export const SubtaskSection = ({
  task,
  accent,
}: {
  task: Task;
  accent: string;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Text mt={4} bold color="em.1" fontSize="2xl">
        {t("subtask", { count: 1 })}
      </Text>
      <Box mt={3}>
        <AnimatePresence>
          {Object.keys(task.subtasks).map((key, i) => {
            const v = task.subtasks[key];
            return (
              <SubtaskCard
                {...v}
                index={i}
                color={accent}
                key={key}
                onEndEditing={name => task.changeSubtaskName(key, name)}
                onToggle={() => task.toggleSubtask(key)}
                onDelete={() => task.deleteSubtask(key)}
              />
            );
          })}
        </AnimatePresence>
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
