import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type BackdropProps = BottomSheetBackdropProps & {
  pointerEvents?: "none" | "auto";
  from?: number[];
  to?: number[];
};
const Backdrop = ({
  animatedIndex,
  style,
  pointerEvents,
  from = [-1, 0],
  to = [0, 0.8],
}: BackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, from, to, Extrapolate.CLAMP),
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
