import StatusBar from "@/components/StatusBar";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { RootStackScreenProps } from "@/navigation/types";
import { Box, KeyboardAvoidingView, ScrollView, Text } from "native-base";
import React from "react";
import { TextInput } from "react-native";
import Footer from "./Footer";
import Label from "./Label";
import ListChip from "./ListChips";
import { MoreButtons } from "./MoreButtons";

export default function AddTaskScreen({
  route,
}: RootStackScreenProps<"AddTask">) {
  const keyboardVisible = useKeyboardStatus();
  return (
    <KeyboardAvoidingView bg="surface" flex={1}>
      <ScrollView
        _contentContainerStyle={{
          bg: "surface",
          pb: "90px",
          flexGrow: 1,
        }}
      >
        <Box bg="surface" px="5" pt="2">
          <StatusBar />
          <Label l="Task Title" mb={2} />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#eaeaea",
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 4,
              fontSize: 18,
              color: "#787878",
            }}
          />
          <Label l="List" mt="5" />
          <Box flexDirection="row" flexWrap="wrap">
            <ListChip name="Work" theme={"givry"} />
            <ListChip name="College" theme="purple" />
            <ListChip name="School" theme="lightBlue" isActive />
            <ListChip name="Other Task" theme="mint" />
          </Box>
          <MoreButtons />
          <Label mb={2} l="Description" mt="5" />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#eaeaea",
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              fontSize: 18,
              color: "#787878",
            }}
            numberOfLines={5}
            textAlignVertical="top"
            multiline={true}
          />
          <Label l="SubTasks" mt="5" />
          <Box py="4">
            <Box flexDir="row" alignItems="center" mb={4}>
              <Box
                mx={2}
                borderColor="gray.500"
                borderWidth={2}
                borderRadius={10}
                h="20px"
                w="20px"
              />
              <Text fontSize={18}>First sub task</Text>
            </Box>
            <Text color="blue.500">Add Sub Task</Text>
          </Box>
        </Box>
      </ScrollView>
      <Footer label="Create New Task" keyboardVisible={keyboardVisible} />
    </KeyboardAvoidingView>
  );
}
