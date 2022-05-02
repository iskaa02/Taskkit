import Task from "@/db/models/Task";
import { Box, Pressable, Text } from "native-base";
import React from "react";
import { BackHandler, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LaterBottomButtons } from "./LaterBottomButtons";
import { MainButtons } from "./MainBottomButtons";
import { TodayBottomButtons } from "../TodayBottomButtons";
import { useTranslation } from "react-i18next";

type BottomButtonsProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function BottomButtons({ tasks, setTasks }: BottomButtonsProps) {
  const [page, setPage] = React.useState<"main" | "today" | "later">("main");
  const { height } = useWindowDimensions();
  const a = useSafeAreaInsets();
  React.useEffect(() => {
    // addEventListener and removeEventListener must refer to the same function
    const onBackPress = () => {
      if (page == "main") return false;
      setPage("main");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [page]);
  const removeTask = React.useCallback(() => {
    setTasks(tasks => tasks.slice(1));
  }, []);
  const { t } = useTranslation();
  return (
    <>
      <Pressable
        onPress={() => {
          if (page != "main") setPage("main");
        }}
        w="100%"
        h={height - 70 - 110}
        top={70 + a.top}
        position={"absolute"}
      />
      <Pressable
        alignSelf="flex-end"
        mx="20px"
        mb="10px"
        py="5px"
        px="8px"
        borderRadius={10}
        _light={{
          _pressed: { backgroundColor: "blue.50" },
        }}
        _dark={{
          _pressed: { backgroundColor: "blue.700:alpha.40" },
        }}
        onPress={removeTask}
      >
        <Text
          fontSize="lg"
          _dark={{ color: "lightBlue.300" }}
          _light={{ color: "blue.500" }}
        >
          {t("skip")}
        </Text>
      </Pressable>
      <Box
        h="110px"
        bg="background"
        borderColor="em.4:alpha.50"
        borderTopWidth={1}
      >
        {page !== "main" ? null : (
          <MainButtons
            task={tasks[0]}
            removeTask={removeTask}
            setPage={setPage}
          />
        )}
        {page !== "today" ? null : (
          <TodayBottomButtons task={tasks[0]} removeTask={removeTask} />
        )}
        {page !== "later" ? null : (
          <LaterBottomButtons task={tasks[0]} removeTask={removeTask} />
        )}
      </Box>
    </>
  );
}
