import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React from "react";

// Android support only for now
export const DatePicker = (
  date: Date,
  setDate: React.Dispatch<React.SetStateAction<Date>>
) => {
  const showMode = (currentMode: "time" | "date", shouldOpenTime?: boolean) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, date) => {
        date && setDate(date);
        if (e.type == "set" && shouldOpenTime) showMode("time");
      },
      mode: currentMode,
      is24Hour: false,
    });
  };
  const showDatePicker = () => {
    showMode("date", true);
  };
  return { showDatePicker, date };
};
