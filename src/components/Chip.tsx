import { Box, Text } from "native-base";
import * as React from "react";

type ChipProps = {
  label: string;
  color?: string;
  variant?: "solid" | "outline";
};
export default function Chip({
  label,
  color = "em.3",
  variant = "outline",
}: ChipProps) {
  return (
    <Box
      px="2"
      style={{ marginStart: 5 }}
      borderWidth={1}
      borderColor={variant === "solid" ? "em.10" : color}
      bg={variant === "solid" ? color : undefined}
      rounded="full"
      alignItems="center"
      justifyContent="center"
    >
      <Text color={variant === "solid" ? "em.10" : color} fontSize="xs">
        {label}
      </Text>
    </Box>
  );
}
