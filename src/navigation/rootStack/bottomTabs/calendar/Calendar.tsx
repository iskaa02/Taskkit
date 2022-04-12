// import {
//   StatusBar,
// } from "expo-status-bar";
import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import { Columns, Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import { withDB } from "@/db/models/withDB";
import { RootTabScreenProps } from "@/navigation/types";
import { Q } from "@nozbe/watermelondb";
import Database from "@nozbe/watermelondb/Database";
import dayjs from "dayjs";
import { Box } from "native-base";
import React from "react";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { AgendaSheet } from "./AgendaSheet";
import useDateMarks from "./markDate";

type ScreenProps = {
  tasks: Task[];
  database: Database;
};
function RawScreen({ tasks, database }: ScreenProps) {
  const [selectedDate, setSelectedDate] = React.useState<string>();
  const [BSindex, setBSindex] = React.useState(0);
  const { onChange, markedDates } = useDateMarks(
    selectedDate,
    i => {
      setSelectedDate(dayjs(i).toString());
    },
    tasks
  );
  return (
    <SafeAreaView style={{ backgroundColor: "#323232", flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <Box bg="#323232" h="60%" pt="4" px="2">
        <Calendar
          theme={{
            backgroundColor: "#323232",
            calendarBackground: "#323232",
            arrowColor: "white",
            monthTextColor: "white",
            textDisabledColor: "rgba(255,255,255,0.3)",
            dayTextColor: "white",
            selectedDayBackgroundColor: "white",
          }}
          markedDates={markedDates}
          onDayPress={onChange}
          markingType={"multi-dot"}
        />
      </Box>
      <AgendaSheet
        {...{ BSindex, setBSindex }}
        selectedDate={selectedDate}
        database={database}
      />
    </SafeAreaView>
  );
}
const Screen = withDB<ScreenProps, { tasks: Task[] }>(
  RawScreen,
  ["database"],
  ({ database }) => ({
    tasks: database
      .get<Task>(Tables.Task)
      .query(
        Q.where(Columns.task.isCompleted, Q.eq(false)),
        Q.where(Columns.task.reminder, Q.notEq(null)),
        Q.sortBy(Columns.task.reminder, Q.asc)
      ),
  })
);

export default function CalendarScreen({}: RootTabScreenProps<"Calendar">) {
  return <Screen database={database} />;
}
