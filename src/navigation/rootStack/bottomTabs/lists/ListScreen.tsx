import { Fab } from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import TaskCard from "@/components/TaskCard";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import Theme from "@/db/models/Theme";
import useAccent from "@/hooks/useAccent";
import { Feather } from "@expo/vector-icons";
import Database from "@nozbe/watermelondb/Database";
import withObservables from "@nozbe/with-observables";
import { Box, Icon, Text, useColorModeValue, useTheme } from "native-base";
import * as React from "react";
import { Pressable, ScrollView } from "react-native";
import { ListStackScreenProps } from "./Stack";
export default function TaskListScreen(navProps: ListStackScreenProps<"List">) {
  return (
    <Screen
      database={database}
      listID={navProps.route.params.listID}
      {...navProps}
    />
  );
}
type ListScreenProps = ListStackScreenProps<"List"> & {
  list: List;
  theme: Theme;
  listID: string;
  database: Database;
};
const RawScreen = ({ list, navigation, theme }: ListScreenProps) => {
  const tintColor = useColorModeValue("#fff", "#000");
  const surface = useTheme().colors.surface;
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
    <>
      <ScrollView
        style={{ backgroundColor: surface }}
        contentContainerStyle={{ flex: 1 }}
      >
        <Box bg="background" flex={1}>
          <StatusBar _dark={"dark-content"} _light={"light-content"} />
          <Box bg={accent} px="20px" pb="20px">
            <Text bold color="em.10" fontSize={32}>
              {list.name}
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
      </ScrollView>
      <Fab
        style={{ backgroundColor: accent }}
        onPress={() => {
          navigation.push("AddTask", { defaultList: "School" });
        }}
      >
        <Icon as={<Feather name="plus" />} color={tintColor} />
      </Fab>
    </>
  );
};

const Screen = withObservables<ListScreenProps, {}>(
  ["listID"],
  async ({ listID, database }) => {
    const list = await database.get<List>(Tables.List).find(listID);
    list.theme;
    return {
      list,
      theme: list.theme,
    };
  }
)(RawScreen);
