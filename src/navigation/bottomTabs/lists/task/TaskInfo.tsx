import { AddSubtask, SubtaskCard } from "@/components/Subtasks";
import Task from "@/db/models/Task";
import { Feather } from "@expo/vector-icons";
import { Box, Icon, Text } from "native-base";
import * as React from "react";

type ExtraInfoProps = {
  iconName: string;
  label: string;
};
export const DateInfo = ({ iconName, label }: ExtraInfoProps) => {
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
export const SubtaskSection = ({
  task,
  accent,
}: {
  task: Task;
  accent: string;
}) => {
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
