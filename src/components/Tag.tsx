import { MotiPressable } from "moti/interactions";
import { Text } from "native-base";
import * as React from "react";
type TagProps = {
  onPress?: () => void;
  bg?: string;
  color?: string;
  children: string;
  variant?: "solid" | "dashed";
};
export default function Tag({
  onPress,
  bg = "transparent",
  color = "em.3",
  children,
  variant = "solid",
}: TagProps) {
  return (
    <MotiPressable
      animate={({ pressed }) => {
        "worklet";
        return {
          scale: pressed ? 0.9 : 1,
        };
      }}
      onPress={onPress}
    >
      <Text
        style={{ marginEnd: 10 }}
        mt="10px"
        px="3"
        alignItems="center"
        textAlign="center"
        py="1"
        fontSize="md"
        color={color}
        borderRadius={10}
        bg={bg}
        {...(variant === "dashed"
          ? {
              borderWidth: 1,
              borderColor: "em.3",
              borderStyle: "dashed",
            }
          : {})}
      >
        {children}
      </Text>
    </MotiPressable>
  );
}
