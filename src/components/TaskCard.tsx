import Task from "@/db/models/Task";
import { withDB } from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import { listThemeType } from "@/theme/listThemes";
import { Text, useTheme } from "native-base";
import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import CheckBox from "./CheckBox";
type TaskCardProps = {
  task: Task;
  theme: listThemeType;
  onPress: () => void;
};
function RawTaskCard({ task, theme, onPress }: TaskCardProps) {
  const surface = useTheme().colors.surface;
  const s = useAnimatedStyle(
    () => ({
      opacity: task.isCompleted ? withSpring(0.8) : withSpring(1),
    }),
    [task.isCompleted]
  );
  const accent = useAccent(theme);
  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[styles.container, { backgroundColor: surface }, s]}
      >
        <CheckBox
          value={task.isCompleted}
          onToggle={() => {
            task.toggleTask();
          }}
          color={accent}
        />

        <Text
          fontSize={23}
          color={accent}
          textDecorationLine={task.isCompleted ? "line-through" : undefined}
        >
          {task.name}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
export default withDB<TaskCardProps, { task: Task }>(
  RawTaskCard,
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
    shadowRadius: 1.0,
    marginBottom: 10,
  },
});
