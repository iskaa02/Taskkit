import BottomSheetModal from "@/components/BottomSheetModal";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import { listThemes, listThemeType } from "@/theme/listThemes";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Box, Input, Text, useTheme, Pressable } from "native-base";
import * as React from "react";
import Footer from "../../../../components/Footer";

export const AddListSheet = React.forwardRef<BottomSheetModalMethods>(
  (_, ref) => {
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
        ref={innerRef}
        backgroundStyle={{
          backgroundColor: surface,
        }}
      >
        <BottomSheetScrollView
          style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        >
          <Text fontSize="2xl" bold mb="5" color="em.1">
            Create New List
          </Text>

          <Text mb="2" fontSize="md" bold>
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
            fontSize="lg"
          />

          <Text mt="5" mb="2" fontSize="md" bold>
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
                  active={theme === activeTheme}
                  theme={theme}
                />
              );
            })}
          </Box>
        </BottomSheetScrollView>
        <Footer
          onPress={async () => {
            database.write(async () => {
              database.get<List>(Tables.List).create(list => {
                list.name = name;
                list.theme = activeTheme;
              });
            });
            innerRef.current?.close();
          }}
          label="Create New List"
        />
      </BottomSheetModal>
    );
  }
);

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
      <Box left={2} w="30px" h="30px" bg={main} rounded="full" />
      {
        <Box
          right={2}
          opacity={0.9}
          w="30px"
          h="30px"
          bg={secondary ?? "background"}
          rounded="full"
        />
      }
    </Pressable>
  );
};
