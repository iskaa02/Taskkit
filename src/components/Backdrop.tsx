import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type BackdropProps = BottomSheetBackdropProps & {
  pointerEvents?: "none" | "auto";
  initialOpacity?: number;
};
const Backdrop = ({
  animatedIndex,
  style,
  pointerEvents,
  initialOpacity = 0,
}: BackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0, 1],
      [0, initialOpacity, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#000000aa",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );
  return <Animated.View pointerEvents={pointerEvents} style={containerStyle} />;
};

export default Backdrop;
