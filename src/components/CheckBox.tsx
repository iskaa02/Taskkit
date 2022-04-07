import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Icon, Pressable } from "native-base";
import * as React from "react";

type CheckBoxProps = {
  value: boolean;
  toggle: () => void;
  color: string;
};
const CheckBox = ({ value, toggle, color }: CheckBoxProps) => {
  return (
    <Pressable
      hitSlop={20}
      w="20px"
      h="20px"
      borderRadius={10}
      borderWidth={value ? 0 : 2}
      style={{ marginEnd: 18 }}
      borderColor={color}
      justifyContent="center"
      alignItems="center"
      onPress={toggle}
    >
      <MotiView
        style={{
          backgroundColor: color,
          width: "105%",
          height: "105%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
        animate={{
          scale: value ? 1 : 0.3,
          opacity: value ? 1 : 0,
        }}
      >
        <Icon as={<Feather name="check" />} color="em.10" size="14px" />
      </MotiView>
    </Pressable>
  );
};

export default CheckBox;
