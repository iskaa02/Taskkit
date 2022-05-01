import dayjs from "dayjs";
import React from "react";
import { ScrollView } from "react-native";
import { showPicker } from "@/hooks/DatePicker";
import { BottomButton } from "./Button";
import { ButtonPageProps } from "./MainBottomButtons";

export function LaterBottomButtons({ task, removeTask }: ButtonPageProps) {
  const laterData = [
    { icon: "chevron-right", label: "tomorrow" },
    { icon: "chevrons-right", label: "2 days" },
    { icon: "skip-forward", label: "next-week" },
    { icon: "calendar", label: "next-month" },
  ];
  const onPress = React.useCallback(
    (key: string) => {
      const date = dayjs();
      if (key === "tomorrow") date.add(1, "day");
      if (key === "2 days") date.add(2, "day");
      if (key === "next-week") date.add(1, "week");
      if (key === "next-month") date.add(1, "month");

      task.editTask({ reminder: date.toDate() });
      removeTask();
    },
    [task]
  );
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      {laterData.map((v, index) => (
        <BottomButton
          key={index}
          iconName={v.icon}
          colorLight="yellow.500"
          colorDark="yellow.400"
          label={v.label}
          onPress={() => {
            onPress(v.label);
          }}
          index={index}
        />
      ))}
      <BottomButton
        onPress={() => {
          // Show date then time picker
          showPicker(new Date(Date.now()), "date", date => {
            if (date.type !== "set") return;
            const d = dayjs(date.nativeEvent.timestamp).toDate();
            showPicker(d, "time", time => {
              const t = dayjs(time.nativeEvent.timestamp).toDate();
              if (time.type === "set") {
                task.editTask({ reminder: t });
                removeTask();
              } else {
                task.editTask({ reminder: t });
                removeTask();
              }
            });
          });
        }}
        label="Custom"
        colorLight="yellow.500"
        colorDark="yellow.400"
        iconName="more-horizontal"
      />
    </ScrollView>
  );
}
