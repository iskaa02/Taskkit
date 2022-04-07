import BottomSheetModal from "@/components/BottomSheetModal";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import { listThemes } from "@/theme/listThemes";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Input, Text, useTheme } from "native-base";
import * as React from "react";
import Footer from "../../addTask/Footer";

export const AddListSheet = React.forwardRef<BottomSheetModalMethods>(
  (_, ref) => {
    const surface = useTheme().colors.surface;
    const innerRef = React.useRef<BottomSheetModalMethods>(null);
    // @ts-ignore
    React.useImperativeHandle(ref, () => innerRef.current);
    const [name, setName] = React.useState("");
    return (
      <BottomSheetModal
        snapPoints={["90%"]}
        ref={innerRef}
        backgroundStyle={{
          backgroundColor: surface,
        }}
      >
        <BottomSheetScrollView
          style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        >
          <Text fontSize={24} bold mb="5" color="em.1">
            Create New List
          </Text>

          <Text mb="2" fontSize={16} bold>
            List Name
          </Text>
          <Input
            defaultValue={name}
            _focus={{ borderColor: "em.3" }}
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
        </BottomSheetScrollView>
        <Footer
          onPress={async () => {
            database.write(async () => {
              database.get<List>(Tables.List).create(list => {
                list.name = name;
                list.theme = listThemes.pink;
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
