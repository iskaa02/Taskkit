import dayjs from "dayjs";
import React from "react";
import { I18nManager, ScrollView } from "react-native";
import { showPicker } from "@/hooks/DatePicker";
import { BottomButton } from "./Button";
import { ButtonPageProps } from "./MainBottomButtons";
import { useTranslation } from "react-i18next";

export function LaterBottomButtons({
  task,
  removeTask,
  setPage,
}: ButtonPageProps) {
  const direction = I18nManager.isRTL ? "left" : "right";
  const laterData = [
    { icon: `chevron-${direction}`, label: "tomorrow" },
    { icon: `chevrons-${direction}`, label: "2-day" },
    {
      icon: `skip-${I18nManager.isRTL ? "back" : "forward"}`,
      label: "next-week",
    },
    { icon: "calendar", label: "next-month" },
  ];
  const { t } = useTranslation();
  const onPress = React.useCallback(
    (key: string) => {
      let date = dayjs();
      if (key === "tomorrow") date = date.add(1, "day");
      if (key === "2 days") date = date.add(2, "day");
      if (key === "next-week") date = date.add(1, "week");
      if (key === "next-month") date = date.add(1, "month");

      task.editTask({ reminder: date.toDate() });
      removeTask();
      setPage("main");
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
          label={t(v.label)}
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
        label={t("custom")}
        colorLight="yellow.500"
        colorDark="yellow.400"
        iconName="more-horizontal"
      />
    </ScrollView>
  );
}
