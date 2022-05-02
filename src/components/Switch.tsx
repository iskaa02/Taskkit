import { MotiView } from "moti";
import { Pressable, useTheme } from "native-base";
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
  style: ViewStyle;
};
export default function Switch({ value, onValueChange, style }: SwitchProps) {
  const { em, blue } = useTheme().colors;
  const progress = useSharedValue(value ? 1 : 0);
  React.useEffect(() => {
    progress.value = withTiming(value ? 1 : 0);
  }, [value]);
  const animatedBackground = useAnimatedStyle(() => {
    // @ts-ignore
    const backgroundColor: string = interpolateColor(
      progress.value,
      [0, 1],
      [em[4], blue[400]]
    );
    return {
      backgroundColor,
    };
  }, [value]);

  return (
    <Pressable
      onPress={() => {
        onValueChange && onValueChange(!value);
      }}
      style={style}
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
