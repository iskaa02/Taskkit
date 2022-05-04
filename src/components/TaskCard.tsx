import List from "@/db/models/List";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import dayjs from "dayjs";
import { MotiView } from "moti";
import { Box, Text } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, Pressable, StyleSheet, View } from "react-native";
import CheckBox from "./CheckBox";
import Chip from "./Chip";
type TaskCardProps = {
  task: Task;
  list: List;
  onPress: () => void;
  animationDelay?: number;
  withDate?: boolean;
};
function TaskCard({
  task,
  list: { theme },
  onPress,
  ...options
}: TaskCardProps) {
  const accent = useAccent(theme);
  return (
    <Pressable onPress={onPress}>
      <MotiView
        animate={{
          top: 0,
          opacity: task.isCompleted ? 0.6 : 1,
          height: undefined,
          marginBottom: 10,
        }}
        transition={{
          delay: options.animationDelay,
          type: "spring",
          damping: 28,
        }}
        from={{ top: 18, opacity: 0.4, marginBottom: 0 }}
        exit={{
          height: 0,
          opacity: 0,
          marginBottom: -1,
          paddingVertical: 0,
        }}
      >
        <View style={styles.container}>
          <Box alignSelf="flex-start" pt="1">
            <CheckBox
              value={task.isCompleted}
              onToggle={i => task.setIsCompleted(i)}
              color={accent}
            />
          </Box>
          <Box flexWrap="wrap" alignItems="center" flex={1} flexDir="row">
            <Text
              textAlign={I18nManager.isRTL ? "right" : "left"}
              noOfLines={3}
              fontSize="xl"
              color={accent}
              textDecorationLine={task.isCompleted ? "line-through" : undefined}
            >
              {task.name}
            </Text>
            {!task.reminder ? null : <DateChip date={task.reminder} />}
          </Box>
        </View>
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
export default withDB<TaskCardProps, { task: Task; list: List }>(
  TaskCard,
  ["task"],
  ({ task }) => ({
    task,
    list: task.list,
  })
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
