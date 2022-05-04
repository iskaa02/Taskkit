import Backdrop from "@/components/Backdrop";
import BottomSheetModal from "@/components/BottomSheetModal";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import { uid } from "@/db/models/uid";
import { listThemes, listThemeType } from "@/theme/listThemes";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { t } from "i18next";
import { Box, Input, Text, useTheme, Pressable } from "native-base";
import * as React from "react";
import Footer from "../../../../components/Footer";

const AddListSheet = React.forwardRef<BottomSheetModalMethods>((_, ref) => {
  const surface = useTheme().colors.surface;
  const innerRef = React.useRef<BottomSheetModalMethods>(null);
  // @ts-ignore
  React.useImperativeHandle(ref, () => innerRef.current);
  const [name, setName] = React.useState("");
  const [activeTheme, setActiveTheme] = React.useState(listThemes.mint);
  return (
    <BottomSheetModal
      snapPoints={["90%"]}
      onDismiss={() => {
        setName("");
      }}
      enableDismissOnClose
      backdropComponent={Backdrop}
      ref={innerRef}
      backgroundStyle={{
        backgroundColor: surface,
      }}
    >
      <BottomSheetScrollView
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
      >
        <Text fontSize="2xl" bold mb="5" color="em.1">
          {t("create-new-list")}
        </Text>

        <Text mb="2" fontSize="md" bold>
          {t("list-name")}
        </Text>
        <Input
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
                active={theme === activeTheme}
                theme={theme}
              />
            );
          })}
        </Box>
      </BottomSheetScrollView>
      <Footer
        onPress={() => {
          if (!name) return;
          database.write(async () => {
            database.get<List>(Tables.List).create(list => {
              list.name = name;
              list.id = uid();
              list.theme = activeTheme;
            });
          });
          innerRef.current?.close();
        }}
        label={t("create-new-list")}
      />
    </BottomSheetModal>
  );
});

type ThemeButtonProps = {
  theme: listThemeType;
  active: boolean;
  onPress: () => void;
};
export const ThemeButton = ({
  theme: { main, secondary },
  active,
  onPress,
}: ThemeButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        width: 55,
        height: 55,
        padding: 6,
        marginEnd: 5,
        marginBottom: 5,
      }}
      borderWidth={1}
      borderColor={active ? "em.4" : "transparent"}
      justifyContent="center"
      borderRadius={14}
      bg={active ? "em.4:alpha.50" : undefined}
      alignItems="center"
    >
      <Box
        left={!!secondary ? 2 : 0}
        w={!!secondary ? "30px" : "35px"}
        h={!!secondary ? "30px" : "35px"}
        bg={main}
        rounded="full"
      />
      {!secondary ? null : (
        <Box
          right={2}
          opacity={0.9}
          w="30px"
          h="30px"
          bg={secondary ?? "background"}
          rounded="full"
        />
      )}
    </Pressable>
  );
};

export default AddListSheet;
