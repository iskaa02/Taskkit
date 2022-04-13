import Task from "@/db/models/Task";
import dayjs from "dayjs";
import React from "react";
import { DateData } from "react-native-calendars";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking/index";

export default function useDateMarks(
  date: string | undefined,
  setDate: (timestamp: string | undefined) => void,
  tasks: Task[]
) {
  const [markedDates, setM] = React.useState<{ [x: string]: MarkingProps }>({});
  const onChange = (i: DateData) => {
    if (date && dayjs(i.timestamp).format("YYYY-MM-DD") === date) {
      setDate(undefined);
    } else {
      setDate(dayjs(i.timestamp).format("YYYY-MM-DD"));
    }
  };
  React.useEffect(() => {
    MarkDates(tasks, date).then(i => {
      setM(i);
    });
  }, [tasks, date]);
  return { markedDates, onChange };
}

const MarkDates = async (tasks: Task[], selected?: string) => {
  let obj: { [x: string]: MarkingProps } = {};
  for (const i in tasks) {
    const value = tasks[i];
    const theme = await value.list.fetch().then(i => i!.theme);
    const d = dayjs(value.reminder).format("YYYY-MM-DD");
    const dot = { key: value.id, color: theme.main };
    const dots = obj[d]?.dots;
    obj[d] = {
      dots: dots ? [...dots, dot] : [dot],
    };
  }
  if (selected)
    obj[selected] = {
      ...obj[selected],
      selected: true,
    };

  return obj;
};
