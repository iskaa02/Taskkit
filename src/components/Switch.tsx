import { MotiView } from "moti";
import { Pressable } from "native-base";
import React from "react";
import { ViewStyle } from "react-native";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type SwitchProps = {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  style?: ViewStyle;
  color?: string;
};
export default function Switch({
  value,
  onValueChange,
  style,
  color,
}: SwitchProps) {
  const progress = useSharedValue(-10);
  React.useEffect(() => {
    progress.value = withTiming(value ? 1 : 0);
  }, [value]);
  const animatedBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#ababab", color ?? "#60a5fa"],
        "RGB"
      ),
    };
  }, [progress.value, color]);

  return (
    <Pressable
      onPress={() => {
        onValueChange && onValueChange(!value);
      }}
      style={style}
      p="1"
    >
      <MotiView
        style={[
          animatedBackground,
          {
            height: 23 + 6,
            padding: 3,
            width: 23 * 2,
            backgroundColor: "#131313",
            borderRadius: 40,
          },
        ]}
      >
        <MotiView
          animate={{ marginStart: value ? 17 : 0 }}
          transition={{ stiffness: 230, damping: 20 }}
          style={[
            {
              borderRadius: 40,
              height: 23,
              backgroundColor: "white",
              width: 23,
            },
          ]}
        />
      </MotiView>
    </Pressable>
  );
}
