import { BottomSheetScrollView, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Box, Pressable, Text, useTheme } from "native-base";
import * as React from "react";
import Backdrop from "./Backdrop";
import CheckBox from "./CheckBox";

type SelectProps = {
  value: string;
  items: string[];
  onChange: (i: string) => void;
};
const SelectSheet = React.forwardRef<BottomSheetModalMethods, SelectProps>(
  ({ onChange, value, items }, ref) => {
    const bottomSheetRef = React.useRef<BottomSheetModalMethods>(null);
    // @ts-ignore
    React.useImperativeHandle(ref, () => bottomSheetRef.current);
    const snapPoints = React.useMemo(
      () => [60 * items.length + 40, "80%"],
      [items]
    );
    const { em, surface } = useTheme().colors;

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        enableDismissOnClose
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={{
          width: 45,
          marginTop: 8,
          backgroundColor: em[2],
        }}
        backgroundStyle={{ backgroundColor: surface }}
        backdropComponent={i => <Backdrop {...i} />}
      >
        <BottomSheetScrollView>
          <>
            {items.map(item => (
              <Pressable
                alignItems="center"
                justifyContent="flex-start"
                flexDir="row"
                px="20px"
                borderRadius="0"
                h={60}
                onPress={() => {
                  onChange(item);
                  bottomSheetRef.current?.close();
                }}
                key={item}
              >
                <Box pointerEvents="none">
                  <CheckBox
                    color={em[2]}
                    iconColor={em[10]}
                    value={item === value}
                    size={20}
                  />
                </Box>
                <Text textAlign="justify" fontSize="lg" flex={1} color="em.2">
                  {item}
                </Text>
              </Pressable>
            ))}
          </>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default SelectSheet;
