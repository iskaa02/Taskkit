import { useIsFocused } from "@react-navigation/native";
import { Box, HStack, Stack, Text } from "native-base";
import React from "react";
import { StatusBar, ScrollView, TouchableOpacity } from "react-native";
import GroupCard from "../components/GroupCard";
import TaskCard from "../components/TaskCard";
// import { database } from "../index.native";
import Task from "../model/Task";
function HomeScreen() {
  const isFocused = useIsFocused();
  return (
    <ScrollView>
      {isFocused ? <StatusBar animated /> : null}
      <Box shadow={2} pb={2} px={5} bg="#fff">
        <Text fontSize={18}>Hello</Text>
        <Text fontSize={32} fontWeight="bold">
          ISKAA
        </Text>
        <Text fontSize={20} fontWeight="semibold">
          5 Tasks for today
        </Text>
      </Box>
      <Box h="200px" mt="5">
        <Text px="5" mb="3" fontSize={20} fontWeight="bold">
          To Do
        </Text>
        <Todo />
      </Box>
      <Box mt="5">
        <InProgress />
      </Box>
    </ScrollView>
  );
}
type TodoProps = {};
const Todo = ({}: TodoProps) => {
  return (
    <ScrollView
      horizontal
      snapToInterval={180}
      snapToAlignment="start"
      decelerationRate={0}
      showsHorizontalScrollIndicator={false}
    >
      <TaskCard theme="purple" />
      <TaskCard theme="pink" />
      <TaskCard theme="green" />
      <TaskCard theme="lightBlue" />
      <TaskCard theme="dodgerBlue" />
    </ScrollView>
  );
};
const InProgress = () => {
  return (
    <Box px="10px">
      <Text px="10px" fontSize={20} fontWeight="bold">
        In Progress
      </Text>
      <GroupCard theme="green" />
      <GroupCard theme="lightBlue" />
      <GroupCard theme="purple" />
    </Box>
  );
};

// const enhance = withObservables(["task"], ({ task }: { task: Task }) => task);
// export default enhance(HomeScreen);
export default HomeScreen;
