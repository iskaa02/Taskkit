import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { showPicker } from "../../hooks/DatePicker";
import { BottomButton } from "./bottomButtons/Button";
import { ButtonPageProps } from "./bottomButtons/MainBottomButtons";

export function TodayBottomButtons({
  removeTask,
  task,
  setPage,
}: ButtonPageProps) {
  const todayData = [
    { hour: "9", am: "AM" },
    { hour: "12", am: "PM" },
    { hour: "3", am: "PM" },
    { hour: "7", am: "PM" },
    { hour: "9", am: "PM" },
  ];
  const { t } = useTranslation();
  const onPress = React.useCallback(
    (hour: number, AmPm: string) => {
      if (hour === 12) {
        hour = 0;
      }
      if (AmPm === "PM") {
        hour = hour + 12;
      }
      task.editTask({ reminder: dayjs().hour(hour).minute(0).toDate() });
      removeTask();
      setPage("main");
    },
    [task]
  );
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      {todayData.map((v, index) => (
        <BottomButton
          key={index}
          iconText={v.hour}
          colorLight="blue.500"
          colorDark="blue.400"
          label={v.am}
          onPress={() => {
            onPress(parseInt(v.hour, 10), v.am);
          }}
          index={index}
        />
      ))}
      <BottomButton
        onPress={() => {
          // Show time picker only
          showPicker(new Date(Date.now()), "time", (e, date) => {
            if (e.type == "set") {
              task.editTask({ reminder: date });
              removeTask();
            }
          });
        }}
        label={t("custom")}
        colorLight="blue.500"
        colorDark="blue.400"
        iconName="more-horizontal"
      />
    </ScrollView>
  );
}
