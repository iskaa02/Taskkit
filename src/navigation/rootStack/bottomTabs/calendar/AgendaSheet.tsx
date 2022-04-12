import { LeftAccentCard } from "@/components/Cards";
import List from "@/db/models/List";
import { Columns, Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import { withDB } from "@/db/models/withDB";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Database, Q } from "@nozbe/watermelondb";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Box, Text, useTheme } from "native-base";
import React, { useCallback, useMemo } from "react";
import { useNavigationProps } from "../lists/ListStackType";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

type AgendaProps = {
  BSindex: number;
  setBSindex: React.Dispatch<React.SetStateAction<number>>;
  tasks: Task[];
  database: Database;
  selectedDate: string | undefined;
};

const RawAgendaSheet = ({
  BSindex,
  setBSindex,
  tasks,
  selectedDate,
}: AgendaProps) => {
  const navigation = useNavigation<useNavigationProps>();
  const snapPoints = useMemo(() => ["45%", "90%"], []);
  const onChange = useCallback((i: number) => {
    setBSindex(i);
  }, []);
  const colors = useTheme().colors;
  return (
    <BottomSheet
      animateOnMount={false}
      // backdropComponent={CustomBackdrop}
      onChange={onChange}
      index={BSindex}
      handleIndicatorStyle={{
        width: 45,
        marginTop: 8,
        backgroundColor: colors.em[2],
      }}
      backgroundStyle={{ backgroundColor: colors.background }}
      snapPoints={snapPoints}
    >
      <BottomSheetScrollView
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 10 }}
      >
        {!selectedDate ? null : <DateSeparator l={selectedDate} />}
        {tasks.map((v, i) => {
          const previous = i === 0 ? null : tasks[i - 1].reminder;
          return (
            <Box key={v.id}>
              {selectedDate ? null : (
                <DateSeparator date={v.reminder!} previous={previous} />
              )}
              <AgendaCard navigation={navigation} key={v.id} task={v} />
            </Box>
          );
        })}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export const AgendaSheet = withDB<AgendaProps, { tasks: Task[] }>(
  RawAgendaSheet,
  ["database", "selectedDate"],
  ({ database, selectedDate }) => ({
    tasks: database.get<Task>(Tables.Task).query(
      Q.where(Columns.task.isCompleted, Q.eq(false)),
      Q.where(Columns.task.reminder, Q.notEq(null)),
      typeof selectedDate === "undefined"
        ? Q.where(
            Columns.task.reminder,
            Q.gte(dayjs().startOf("day").valueOf())
          )
        : Q.and(
            Q.where(
              Columns.task.reminder,
              Q.gte(dayjs(selectedDate).startOf("day").valueOf())
            ),
            Q.where(
              Columns.task.reminder,
              Q.lte(dayjs(selectedDate).startOf("day").add(1, "day").valueOf())
            )
          ),

      Q.sortBy(Columns.task.reminder, Q.asc)
    ),
  })
);
type SeparatorProps = {
  date?: Date;
  previous?: Date | null;
  l?: string;
};
const DateSeparator = ({ date, previous, l }: SeparatorProps) => {
  const d = dayjs(l ?? date);
  if (!l && d.isSame(previous, "day")) {
    return null;
  }
  const label = d.isToday()
    ? "Today"
    : d.isTomorrow()
    ? "Tomorrow"
    : d.format("MMMM D");
  return (
    <Box my="2" px="10px">
      <Text fontSize={28} bold>
        {label}
      </Text>
    </Box>
  );
};
type AgendaCardProps = {
  task: Task;
  list: List;
  navigation: useNavigationProps;
};
const RawAgendaCard = ({ list, task, navigation }: AgendaCardProps) => {
  return (
    <LeftAccentCard
      onPress={() =>
        navigation.navigate("Task", {
          theme: list.theme,
          taskID: task.id,
        })
      }
      theme={list.theme}
    >
      <Box alignItems="flex-start" flexDir="row">
        <Box w="73%">
          <Text fontSize={20} bold>
            {task.name}
          </Text>
          <Text fontSize={16}>{list.name}</Text>
        </Box>
        <Box style={{ marginStart: "auto" }}>
          <Text fontSize={16}>{dayjs(task.reminder).format("h:mmA")}</Text>
          <Text fontSize={14}>{dayjs(task.reminder).format("ddd")}</Text>
        </Box>
      </Box>
    </LeftAccentCard>
  );
};
const AgendaCard = withDB<AgendaCardProps, { list: List }>(
  RawAgendaCard,
  ["task"],
  ({ task }) => ({
    list: task.list,
  })
);
