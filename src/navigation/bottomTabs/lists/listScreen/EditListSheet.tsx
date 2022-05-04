import BottomSheetModal from "@/components/BottomSheetModal";
import Footer from "@/components/Footer";
import List from "@/db/models/List";
import { listThemes } from "@/theme/listThemes";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Box, Input, Text, useTheme } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        <Text fontSize="xl" bold mb="5" color="em.1">
          {t("edit") + " " + t("list", { count: 1, postProcess: "interval" })}
        </Text>

        <Text mb="2" fontSize="md" bold>
          {t("list-name")}
        </Text>
        <Input
          textAlign="left"
          h="40px"
          defaultValue={name}
          onChangeText={i => setName(i)}
          fontSize="lg"
        />

        <Text mt="5" mb="2" fontSize="md" bold>
          {t("theme")}
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
        label={t("save")}
      />
    </BottomSheetModal>
  );
});
