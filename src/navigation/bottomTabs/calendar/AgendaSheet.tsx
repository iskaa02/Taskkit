import Backdrop from "@/components/Backdrop";
import LeftAccentCard from "@/components/Cards";
import DateSeparator from "@/components/DateSeparator";
import List from "@/db/models/List";
import { Columns } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import { queryTasks } from "@/db/queries";
import { useNavigationProps } from "@/navigation/navPropsType";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Q } from "@nozbe/watermelondb";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import { Box, Text, useTheme } from "native-base";
import React, { useMemo } from "react";
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

type AgendaProps = {
  tasks: Task[];
  selectedDate: string | undefined;
};

const RawAgendaSheet = ({ tasks, selectedDate }: AgendaProps) => {
  const navigation = useNavigation<useNavigationProps>();
  const snapPoints = useMemo(() => ["45%", "90%"], []);
  const colors = useTheme().colors;
  return (
    <BottomSheet
      animateOnMount={false}
      backdropComponent={p => (
        <Backdrop pointerEvents="none" {...p} from={[0, 1]} />
      )}
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
        {!selectedDate ? (
          tasks.length !== 0 ? null : (
            <DateSeparator l={selectedDate ?? dayjs().toString()} />
          )
        ) : (
          <DateSeparator l={selectedDate ?? dayjs().toString()} />
        )}
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
  ["selectedDate"],
  ({ selectedDate }) => ({
    tasks: queryTasks(
      {
        from: dayjs(selectedDate).startOf("day").valueOf(),
        to: selectedDate
          ? dayjs(selectedDate).endOf("day").valueOf()
          : undefined,
      },
      Q.sortBy(Columns.task.reminder, Q.asc)
    ),
  })
);
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
          <Text textAlign="justify" fontSize="xl" bold>
            {task.name}
          </Text>
          <Text fontSize="md" textAlign="justify">
            {list.name}
          </Text>
        </Box>
        <Box style={{ marginStart: "auto" }}>
          <Text fontSize="md">{dayjs(task.reminder).format("h:mmA")}</Text>
          <Text fontSize="sm">{dayjs(task.reminder).format("ddd")}</Text>
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
