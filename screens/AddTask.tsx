import { Feather } from "@expo/vector-icons";
import { Box, Icon, Text } from "native-base";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import useKeyboardStatus from "../hooks/useKeyboadStatus";
import Footer from "./AddTask/Footer";
import Label from "./AddTask/Label";
import ListChip from "./AddTask/ListChips";

export default function AddTaskScreen() {
  const keyboardVisible = useKeyboardStatus();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "white",
          paddingBottom: 90,
        }}
      >
        <Box px="5" pt="2">
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
            <ListChip name="Work" theme="givry" />
            <ListChip name="College" theme="purple" />
            <ListChip name="School" theme="lightBlue" isActive />
            <ListChip name="Other Task" theme="green" />
          </Box>
          <MoreButtons />
          <Label l="Description" mt="5" />
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
      <Footer keyboardVisible={keyboardVisible} />
    </KeyboardAvoidingView>
  );
}

const MoreButtons = () => {
  return (
    <Box mt="5" justifyContent="space-around" flexDirection="row">
      <Button
        label="2:00PM"
        color="black"
        bg={"blue.100"}
        icon={<Feather name="watch" />}
      />
      <Button
        label="1 day"
        color="black"
        bg="red.100"
        icon={<Feather name="repeat" />}
      />
      <Button
        label="3 notes"
        color="black"
        bg="green.200"
        icon={<Feather name="paperclip" />}
      />
    </Box>
  );
};
type ButtonProps = {
  icon: React.ReactNode;
  label?: string;
  bg: string;
  color: string;
};
const Button = ({ icon, bg, color, label }: ButtonProps) => {
  return (
    <Box justifyContent="center" alignItems="center">
      <TouchableOpacity
        activeOpacity={0.4}
        style={{ borderRadius: 100, width: 60, height: 60 }}
      >
        <Box
          w="100%"
          h="100%"
          borderRadius={100}
          justifyContent="center"
          alignItems="center"
          bg={bg}
        >
          <Icon as={icon} color={color} size={28} />
        </Box>
      </TouchableOpacity>
      <Text>{label}</Text>
    </Box>
  );
};
