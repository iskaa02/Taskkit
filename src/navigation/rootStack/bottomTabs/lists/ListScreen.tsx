import StatusBar from "@/components/StatusBar";
import TaskCard from "@/components/TaskCard";
import useAccent from "@/hooks/useAccent";
import { Box, Text, useColorModeValue, useTheme } from "native-base";
import * as React from "react";
import { Pressable } from "react-native";
import { ListStackScreenProps } from "./Stack";
export default function TaskListView({
  route,
  navigation,
}: ListStackScreenProps<"List">) {
  const listThemes: any = useTheme().colors;
  const tintColor = useColorModeValue("#fff", "#000");
  const theme = React.useMemo(
    () => listThemes[route.params.theme],
    [route.params]
  );
  const accent = useAccent(theme);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: accent,
      },
      headerTintColor: tintColor,
    });
  }, []);
  return (
    <Box bg="background">
      <StatusBar _dark={"dark-content"} _light={"light-content"} />
      <Box bg={accent} px="20px" pb="20px">
        <Text bold color="em.10" fontSize={32}>
          Personal
        </Text>

        <Text mt={4} color={"em.10"} fontSize={16}>
          5 Tasks left 3 completed
        </Text>
      </Box>

      <Box mt={4} px="20px">
        <Text bold color="em.2" fontSize={26}>
          Tasks
        </Text>
        <Pressable
          onPress={() =>
            navigation.push("Task", { theme: theme, label: "hello world" })
          }
        >
          <TaskCard l="hello world" theme={theme} />
        </Pressable>
      </Box>
    </Box>
  );
}
