import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Icon, Pressable } from "native-base";
import * as React from "react";

type CheckBoxProps = {
  value: boolean;
  onToggle?: (i: boolean) => void;
  color: string;
  iconColor?: string;
  size?: number;
  withTint?: boolean;
};
const CheckBox = ({
  value,
  onToggle: toggle,
  color,
  size = 22,
  iconColor = "em.10",
  withTint,
}: CheckBoxProps) => {
  return (
    <Pressable
      hitSlop={15}
      borderRadius={size}
      borderWidth={value ? 0 : 2}
      style={{ marginEnd: 18, marginStart: 1, width: size, height: size }}
      borderColor={color}
      bg={withTint ? `${color}:alpha.10` : "transparent"}
      justifyContent="center"
      alignItems="center"
      onPress={() => {
        toggle && toggle(!value);
      }}
    >
      <MotiView
        style={{
          backgroundColor: color,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: size,
        }}
        animate={{
          scale: value ? 1 : 0.3,
          opacity: value ? 1 : 0,
        }}
        transition={{ damping: 10 }}
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
