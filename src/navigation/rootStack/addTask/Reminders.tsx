import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Box, Icon, Text, useColorModeValue } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { DatePicker } from "./DatePicker";

type RemindersProps = {
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
  active: boolean;
};
export const Reminders = ({ active, value, setValue }: RemindersProps) => {
  const colorIntensity = useColorModeValue("200", "400");
  const { showDatePicker, date } = DatePicker(value, setValue);
  return (
    <Box
      opacity={active ? 1 : 0.5}
      pointerEvents={active ? "auto" : "none"}
      mt="5"
      justifyContent="space-around"
      alignItems="flex-start"
      flexDirection="row"
    >
      <Button
        onPress={() => showDatePicker()}
        label={dayjs(date).format("MMM D\nhh:mm A")}
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
    </Box>
  );
};
type ButtonProps = {
  icon: React.ReactNode;
  label?: string;
  bg: string;
  color: string;
  onPress: () => void;
};
const Button = ({ icon, bg, color, label, onPress }: ButtonProps) => {
  return (
    <Box w="70px" justifyContent="center" alignItems="center">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.4}
        style={{ borderRadius: 100, width: 60, height: 60 }}
      >
        <Box
          w="100%"
          h="100%"
          borderRadius={10}
          justifyContent="center"
          alignItems="center"
          bg={bg}
        >
          <Icon as={icon} color={color} size={28} />
        </Box>
      </TouchableOpacity>
      <Text mt="1" textAlign="center">
        {label}
      </Text>
    </Box>
  );
};
