import BottomSheetModal from "@/components/BottomSheetModal";
import Footer from "@/components/Footer";
import List from "@/db/models/List";
import { listThemes } from "@/theme/listThemes";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Box, Input, Text, useTheme } from "native-base";
import React from "react";
import { ThemeButton } from "./AddListSheet";

type EditListSheetProps = {
  list: List;
};
export const EditListSheet = React.forwardRef<
  BottomSheetModalMethods,
  EditListSheetProps
>(({ list }, ref) => {
  const surface = useTheme().colors.surface;
  const sheetRef = React.useRef<BottomSheetModalMethods>(null);
  // @ts-ignore
  React.useImperativeHandle(ref, () => sheetRef.current);
  const [name, setName] = React.useState(list.name);
  const [activeTheme, setActiveTheme] = React.useState(list.theme);
  return (
    <BottomSheetModal
      snapPoints={["90%"]}
      onDismiss={() => {
        setName(list.name);
        setActiveTheme(list.theme);
      }}
      enableDismissOnClose
      ref={sheetRef}
      backgroundStyle={{
        backgroundColor: surface,
      }}
    >
      <BottomSheetScrollView
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
      >
        <Text fontSize={24} bold mb="5" color="em.1">
          Edit List
        </Text>

        <Text mb="2" fontSize={16} bold>
          List Name
        </Text>
        <Input
          value={name}
          onChangeText={v => setName(v)}
          borderWidth={1}
          selectionColor={"#000"}
          borderColor="em.3"
          color="em.1"
          borderRadius={5}
          px="5px"
          py="5px"
          fontSize={18}
        />

        <Text mt="5" mb="2" fontSize={16} bold>
          Theme
        </Text>
        <Box flexDirection="row" flexWrap="wrap">
          {Object.keys(listThemes).map((v, i) => {
            const theme = listThemes[v];
            return (
              <ThemeButton
                onPress={() => {
                  setActiveTheme(theme);
                }}
                key={i}
                active={
                  activeTheme.main == theme.main &&
                  activeTheme.secondary === theme.secondary
                }
                theme={theme}
              />
            );
          })}
        </Box>
      </BottomSheetScrollView>
      <Footer
        onPress={() => {
          if (!name) return;
          list.editList({ name, theme: activeTheme }).then(() => {
            sheetRef.current?.close();
          });
        }}
        label="Save"
      />
    </BottomSheetModal>
  );
});
