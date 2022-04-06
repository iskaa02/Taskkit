import {
  BottomSheetModal as BSM,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "native-base";
import * as React from "react";
import { BackHandler } from "react-native";
import Backdrop from "./Backdrop";

const NotesBottomSheet = React.forwardRef<
  BottomSheetModalMethods,
  BottomSheetModalProps
>((p, ref) => {
  const colors = useTheme().colors;
  const innerRef = React.useRef<BottomSheetModalMethods>(null);
  // @ts-ignore
  React.useImperativeHandle(ref, () => innerRef.current);
  const [isShowing, setIsShowing] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      // addEventListener and removeEventListener must refer to the same function
      const onBackPress = () => {
        if (isShowing) {
          innerRef.current?.dismiss();
          return true; // TS complains if handler doesn't return a boolean
        } else {
          return false;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [innerRef, isShowing])
  );
  const onChange = React.useCallback((i: number) => {
    setIsShowing(i > -1);
    p.onChange && p.onChange(i);
  }, []);
  return (
    <BSM
      handleIndicatorStyle={{
        width: 45,
        marginTop: 8,
        backgroundColor: colors.em[2],
      }}
      backgroundStyle={{ backgroundColor: colors.background }}
      backdropComponent={i => (
        <Backdrop {...i} pointerEvents="auto" initialOpacity={0.4} />
      )}
      {...p}
      onChange={onChange}
      ref={innerRef}
    />
  );
});

export default NotesBottomSheet;
