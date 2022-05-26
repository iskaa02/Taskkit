import Backdrop from "@/components/Backdrop";
import LeftAccentCard from "@/components/Cards";
import DateSeparator from "@/components/DateSeparator";
import List from "@/db/models/List";
import { Columns } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import { queryTasks } from "@/db/queries";
import { useNavigationProps } from "@/navigation/navPropsType";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Q } from "@nozbe/watermelondb";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import { Box, Text, useTheme } from "native-base";
import React, { useMemo, useState } from "react";
import { BackHandler, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

type AgendaProps = {
  tasks: Task[];
  selectedDate: string | undefined;
  calendarHeight: number;
};

const RawAgendaSheet = ({
  tasks,
  selectedDate,
  calendarHeight,
}: AgendaProps) => {
  const navigation = useNavigation<useNavigationProps>();
  const [index, setIndex] = useState(0);
  const { height: deviceHeight } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const snapPoints = useMemo(
    () => [deviceHeight - calendarHeight - top - 20, "90%"],
    [calendarHeight]
  );
  React.useEffect(() => {
    const backAction = () => {
      if (index === 1) {
        setIndex(0);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [index]);
  const colors = useTheme().colors;
  return (
    <BottomSheet
      index={index}
      onChange={i => setIndex(i)}
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
      <BottomSheetFlatList
        data={tasks}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 10 }}
        ListHeaderComponent={() => {
          return (
            <>
              {!selectedDate ? (
                tasks.length !== 0 ? null : (
                  <DateSeparator l={selectedDate ?? dayjs().toString()} />
                )
              ) : (
                <DateSeparator l={selectedDate ?? dayjs().toString()} />
              )}
            </>
          );
        }}
        renderItem={({ item: v, index: i }) => {
          const previous = i === 0 ? null : tasks[i - 1].reminder;
          return (
            <Box key={v.id}>
              {selectedDate ? null : (
                <DateSeparator date={v.reminder!} previous={previous} />
              )}
              <AgendaCard navigation={navigation} key={v.id} task={v} />
            </Box>
          );
        }}
      />
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
      Q.where(Columns.task.isCompleted, Q.eq(false)),
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
          <Text textAlign="left" fontSize="xl" bold noOfLines={3}>
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
