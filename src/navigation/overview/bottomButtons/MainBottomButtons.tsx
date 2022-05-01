import { database } from "@/db/db";
import Task from "@/db/models/Task";
import React from "react";
import { ScrollView } from "react-native";
import { BottomButton } from "./Button";

export type ButtonPageProps = {
  removeTask: () => void;
  task: Task;
};
export function MainButtons({
  task,
  removeTask,
  setPage,
}: ButtonPageProps & {
  setPage: React.Dispatch<React.SetStateAction<"main" | "today" | "later">>;
}) {
  const mainButtonData = [
    {
      label: "Today",
      iconName: "coffee",
      color: "blue",
      onPress: () => {
        setPage("today");
      },
    },
    {
      label: "Done",
      iconName: "check",
      color: "green",
      onPress: () => {
        task.setIsCompleted(true);
        removeTask();
      },
    },

    {
      label: "Later",
      iconName: "sunset",
      color: "yellow",
      onPress: () => {
        setPage("later");
      },
    },
    {
      label: "Delete",
      iconName: "x",
      color: "red",
      onPress: () => {
        database.write(async () => {
          await task.markAsDeleted();
        });
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
