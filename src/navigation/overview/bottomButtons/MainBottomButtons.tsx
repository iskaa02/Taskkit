import Task from "@/db/models/Task";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { BottomButton } from "./Button";

export type ButtonPageProps = {
  removeTask: () => void;
  setPage: React.Dispatch<React.SetStateAction<"main" | "today" | "later">>;
  task: Task;
};
export function MainButtons({
  task,
  removeTask,
  setPage,
}: ButtonPageProps & {}) {
  const { t } = useTranslation();
  const mainButtonData = [
    {
      label: t("today"),
      iconName: "coffee",
      color: "blue",
      onPress: () => {
        setPage("today");
      },
    },
    {
      label: t("done"),
      iconName: "check",
      color: "green",
      onPress: () => {
        task.setIsCompleted(true);
        removeTask();
      },
    },

    {
      label: t("later"),
      iconName: "sunset",
      color: "yellow",
      onPress: () => {
        setPage("later");
      },
    },
    {
      label: t("delete"),
      iconName: "x",
      color: "red",
      onPress: () => {
        task.markAsDeleted();
        removeTask();
      },
    },
  ];
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      {mainButtonData.map((v, index) => {
        return (
          <BottomButton
            {...v}
            key={index}
            colorDark={v.color + ".400"}
            colorLight={v.color + ".500"}
            index={index}
          />
        );
      })}
    </ScrollView>
  );
}
