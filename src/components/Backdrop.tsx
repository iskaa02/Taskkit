import {
  BottomSheetBackdropProps,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { TapGestureHandler } from "react-native-gesture-handler";
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
  const { dismiss } = useBottomSheetModal();

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
  return (
    <TapGestureHandler
      onEnded={i => {
        dismiss();
      }}
    >
      <Animated.View
        onTouchEnd={() => {
          dismiss();
        }}
        pointerEvents={pointerEvents}
        style={containerStyle}
      />
    </TapGestureHandler>
  );
};

export default Backdrop;
