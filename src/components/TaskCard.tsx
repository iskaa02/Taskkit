import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import { listThemeType } from "@/theme/listThemes";
import dayjs from "dayjs";
import { MotiView } from "moti";
import { Box, Text, useTheme } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";
import CheckBox from "./CheckBox";
import Chip from "./Chip";
type TaskCardProps = {
  task: Task;
  theme?: listThemeType;
  onPress: () => void;
  animationDelay?: number;
  withDate?: boolean;
};
function TaskCard({
  task,
  theme: initialTheme,
  onPress,
  ...options
}: TaskCardProps) {
  const { em } = useTheme().colors;
  const [theme, setTheme] = React.useState(() => {
    if (initialTheme) return initialTheme;
    return { main: em[1] };
  });
  const accent = useAccent(theme);
  React.useLayoutEffect(() => {
    task.list.fetch().then(l => {
      if (l) setTheme(l.theme);
    });
  }, [task]);
  return (
    <Pressable onPress={onPress}>
      <MotiView
        style={[styles.container]}
        animate={{
          top: 0,
          opacity: task.isCompleted ? 0.6 : 1,
          height: 40,
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
        <Box alignItems="center" flex={1} flexDir="row">
          <Text
            textAlign="justify"
            fontSize="xl"
            color={accent}
            isTruncated
            textDecorationLine={task.isCompleted ? "line-through" : undefined}
          >
            {task.name}
          </Text>
          {!task.reminder ? null : <DateChip date={task.reminder} />}
        </Box>
      </MotiView>
    </Pressable>
  );
}

type DateChipProps = {
  date: Date;
};
const DateChip = ({ date }: DateChipProps) => {
  const { t } = useTranslation();
  const label = React.useMemo(() => {
    const d = dayjs(date);
    if (d.isToday()) return d.format("h:mm A");
    if (d.isTomorrow()) return t("tomorrow") + d.format(" hh:mm A");
    if (d.isSame(date, "year")) return d.format("MMM D");
    return d.format("MMM D, YYYY");
  }, [date]);
  return <Chip {...{ label }} />;
};
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
    paddingHorizontal: 5,
    marginBottom: 10,
  },
});
