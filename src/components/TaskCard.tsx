import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import { listThemeType } from "@/theme/listThemes";
import dayjs from "dayjs";
import { MotiView } from "moti";
import { Box, Text, useTheme } from "native-base";
import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import CheckBox from "./CheckBox";
type TaskCardProps = {
  task: Task;
  theme?: listThemeType;
  onPress: () => void;
  animationDelay?: number;
  withDate?: boolean;
  withList?: boolean;
  withTime?: boolean;
};
function TaskCard({
  task,
  theme: initialTheme,
  onPress,
  ...options
}: TaskCardProps) {
  const { surface, em } = useTheme().colors;
  const [{ listName, theme }, setListProps] = React.useState(() => {
    if (initialTheme) return { theme: initialTheme, listName: "" };
    return { theme: { main: em[1] }, listName: "" };
  });
  const accent = useAccent(theme);
  React.useLayoutEffect(() => {
    if (initialTheme && !options.withList) return;
    task.list.fetch().then(l => {
      if (l?.name === listName) return;
      if (l) {
        setListProps({ listName: l.name, theme: l.theme });
      }
    });
  }, [task, initialTheme, options.withList]);
  return (
    <Pressable onPress={onPress}>
      <MotiView
        style={[styles.container, { backgroundColor: surface }]}
        animate={{
          top: 0,
          opacity: task.isCompleted ? 0.6 : 1,
          height: options.withList ? 70 : 60,
        }}
        transition={{ delay: options.animationDelay, damping: 26 }}
        from={{ top: 18, opacity: 0.4 }}
        exit={{
          height: 0,
          opacity: 0,
          marginBottom: -6,
          paddingVertical: 0,
        }}
      >
        <CheckBox
          value={task.isCompleted}
          onToggle={i => task.setIsCompleted(i)}
          color={accent}
        />
        <Box flex={1}>
          <Text
            textAlign="justify"
            fontSize="xl"
            color={accent}
            isTruncated
            textDecorationLine={task.isCompleted ? "line-through" : undefined}
          >
            {task.name}
          </Text>
          {!options.withList ? null : (
            <Text textAlign="justify" fontSize="md" color={accent} isTruncated>
              {listName}
            </Text>
          )}
        </Box>
        <Box>
          <Box>
            {!options.withDate ? null : (
              <Text textAlign="justify" color={accent} fontSize="sm">
                {dayjs(task.reminder).format("ddd")}
              </Text>
            )}
            {!options.withTime ? null : (
              <Text textAlign="center" fontSize="md" color={accent}>
                {dayjs(task.reminder).format("h:mmA")}
              </Text>
            )}
          </Box>
        </Box>
      </MotiView>
    </Pressable>
  );
}
export default withDB<TaskCardProps, { task: Task }>(
  TaskCard,
  ["task"],
  ({ task }) => ({
    task,
  })
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 15,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    marginBottom: 10,
  },
});
