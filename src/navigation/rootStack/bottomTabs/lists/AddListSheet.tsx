import BottomSheetModal from "@/components/BottomSheetModal";
import { Text, useTheme } from "native-base";
import * as React from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import TextInput from "@/components/TextInput";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Footer from "../../addTask/Footer";
import { database } from "@/db/db";
import List from "@/db/models/List";

export const AddListSheet = React.forwardRef<BottomSheetModalMethods>(
  (p, ref) => {
    const surface = useTheme().colors.surface;
    const innerRef = React.useRef<BottomSheetModalMethods>(null);
    // @ts-ignore
    React.useImperativeHandle(ref, () => innerRef.current);
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
          <TextInput
            borderWidth={1}
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
              return await database.get<List>("List").create(list => {
                list.name = "new List";
                list.theme = "lightBlue";
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
