import { Feather } from "@expo/vector-icons";
import { MotiPressable } from "moti/interactions";
import { Box, Icon, Text } from "native-base";
import * as React from "react";
import { Easing } from "react-native-reanimated";
type TagProps = {
  onPress?: () => void;
  bg?: string;
  color?: string;
  children: string;
  variant?: "solid" | "dashed";
  withCloseIcon?: boolean;
};
export default function Tag({
  onPress,
  bg,
  color = "em.1",
  children,
  variant = "solid",
  withCloseIcon: withClose,
}: TagProps) {
  return (
    <MotiPressable
      animate={({ pressed }) => {
        "worklet";
        return {
          scale: pressed ? 0.9 : 1,
        };
      }}
      transition={{
        type: "timing",
        duration: 100,
        easing: Easing.in(Easing.ease),
      }}
      onPress={onPress}
    >
      <Box
        flexDir="row"
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
        style={{ marginEnd: 10 }}
        mt="10px"
        px="3"
        alignItems="center"
        textAlign="center"
        py="1"
      >
        <Text color={color} fontSize="md">
          {children}
        </Text>
        {!withClose ? null : (
          <Icon
            color={color}
            size={"14px"}
            style={{ marginStart: 4 }}
            as={<Feather name="x" />}
          />
        )}
      </Box>
    </MotiPressable>
  );
}
