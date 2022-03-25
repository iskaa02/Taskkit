import StatusBar from "@/components/StatusBar";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { Feather } from "@expo/vector-icons";
import {
  Box,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useColorModeValue,
} from "native-base";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native";
import Footer from "./Footer";
import Label from "./Label";
import ListChip from "./ListChips";

export default function AddTaskScreen() {
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
      <Footer keyboardVisible={keyboardVisible} />
    </KeyboardAvoidingView>
  );
}

const MoreButtons = () => {
  const colorIntensity = useColorModeValue("200", "400");
  return (
    <Box mt="5" justifyContent="space-around" flexDirection="row">
      <Button
        label="2:00PM"
        color="black"
        bg={`blue.${colorIntensity}`}
        icon={<Feather name="watch" />}
      />
      <Button
        label="1 day"
        color="black"
        bg={`red.${colorIntensity}`}
        icon={<Feather name="repeat" />}
      />
      <Button
        label="3 notes"
        color="black"
        bg={`green.${colorIntensity}`}
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
