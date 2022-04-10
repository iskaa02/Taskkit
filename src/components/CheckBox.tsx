import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Icon, Pressable } from "native-base";
import * as React from "react";

type CheckBoxProps = {
  value: boolean;
  onToggle?: () => void;
  color: string;
  iconColor?: string;
  size?: number;
};
const CheckBox = ({
  value,
  onToggle: toggle,
  color,
  size = 20,
  iconColor = "em.10",
}: CheckBoxProps) => {
  return (
    <Pressable
      hitSlop={20}
      w={`${size}px`}
      h={`${size}px`}
      borderRadius={size / 2}
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
          borderRadius: size / 2,
        }}
        animate={{
          scale: value ? 1 : 0.3,
          opacity: value ? 1 : 0,
        }}
      >
        <Icon
          as={<Feather name="check" />}
          color={iconColor}
          size={0.7 * size}
        />
      </MotiView>
    </Pressable>
  );
};

export default CheckBox;
