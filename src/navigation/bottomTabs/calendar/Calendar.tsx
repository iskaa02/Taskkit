import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import { Columns, Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import { storage } from "@/db/storage";
import { Feather } from "@expo/vector-icons";
import { Q } from "@nozbe/watermelondb";
import Database from "@nozbe/watermelondb/Database";
import { Box, Icon } from "native-base";
import React, { useState } from "react";
import { I18nManager } from "react-native";
import { Calendar } from "react-native-calendars";
import { useMMKVString } from "react-native-mmkv";
import { SafeAreaView } from "react-native-safe-area-context";
import { AgendaSheet } from "./AgendaSheet";
import useDateMarks from "./markDate";

type ScreenProps = {
  tasks: Task[];
  database: Database;
};
function RawScreen({ tasks }: ScreenProps) {
  const [selectedDate, setSelectedDate] = React.useState<string>();
  // Rerender when language change
  useMMKVString("lang", storage);
  const [height, setHeight] = useState(0);
  const { onChange, markedDates } = useDateMarks(
    selectedDate,
    i => setSelectedDate(i),
    tasks
  );
  return (
    <SafeAreaView style={{ backgroundColor: "#323232", flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Box
        onLayout={({ nativeEvent }) => {
          setHeight(nativeEvent.layout.height);
        }}
        bg="#323232"
        pt="4"
        px="2"
      >
        <Calendar
          theme={{
            backgroundColor: "#323232",
            calendarBackground: "#323232",
            arrowColor: "white",
            monthTextColor: "white",
            textDisabledColor: "rgba(255,255,255,0.3)",
            dayTextColor: "white",
            selectedDayBackgroundColor: "rgba(255,255,255,0.2)",
            todayBackgroundColor: "#174582",
            todayTextColor: "white",
            selectedDayTextColor: "white",
          }}
          showSixWeeks
          renderArrow={direction => (
            <Icon
              as={Feather}
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
              color="white"
            />
          )}
          markedDates={markedDates}
          onDayPress={onChange}
          markingType={"multi-dot"}
        />
      </Box>
      <AgendaSheet calendarHeight={height} selectedDate={selectedDate} />
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
      )
      .observeWithColumns([Columns.task.reminder]),
  })
);

export default function CalendarScreen() {
  return <Screen database={database} />;
}
