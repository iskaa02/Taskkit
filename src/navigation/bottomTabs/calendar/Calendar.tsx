// import {
//   StatusBar,
// } from "expo-status-bar";
import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import { Columns, Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import { Q } from "@nozbe/watermelondb";
import Database from "@nozbe/watermelondb/Database";
import { Box, Icon } from "native-base";
import React from "react";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { AgendaSheet } from "./AgendaSheet";
import useDateMarks from "./markDate";
import "@/i18n/calendar";
import { Feather } from "@expo/vector-icons";
import { I18nManager } from "react-native";

type ScreenProps = {
  tasks: Task[];
  database: Database;
};
function RawScreen({ tasks, database }: ScreenProps) {
  const [selectedDate, setSelectedDate] = React.useState<string>();
  const [BSindex, setBSindex] = React.useState(0);
  const { onChange, markedDates } = useDateMarks(
    selectedDate,
    i => setSelectedDate(i),
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
            selectedDayBackgroundColor: "rgba(255,255,255,0.2)",
            todayBackgroundColor: "#22577E",
            todayTextColor: "white",
            selectedDayTextColor: "white",
          }}
          renderArrow={direction => (
            <Icon
              as={<Feather />}
              size="sm"
              name={
                direction === "left"
                  ? I18nManager.isRTL
                    ? "chevron-right"
                    : "chevron-left"
                  : I18nManager.isRTL
                  ? "chevron-left"
                  : "chevron-right"
              }
            />
          )}
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

export default function CalendarScreen() {
  return <Screen database={database} />;
}
