import Tag from "@/db/models/tag";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import Backdrop from "@/components/Backdrop";
import BottomSheetModal from "@/components/BottomSheetModal";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Box, IBoxProps, Text, useContrastText, useTheme } from "native-base";
import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

type AddTagSheetProps = {
  tags: Tag[];
  onTagPress: (id: string) => void;
};
const AddTagSheet = React.forwardRef(
  ({ tags, onTagPress }: AddTagSheetProps, ref) => {
    const surface = useTheme().colors.surface;
    const innerRef = React.useRef<BottomSheetModalMethods>(null);
    // @ts-ignore
    React.useImperativeHandle(ref, () => innerRef.current);
    return (
      <BottomSheetModal
        snapPoints={["40%", "90%"]}
        enableDismissOnClose
        backdropComponent={Backdrop}
        ref={innerRef}
        backgroundStyle={{
          backgroundColor: surface,
        }}
      >
        <BottomSheetScrollView style={{ paddingVertical: 10 }}>
          <>
            {tags.map(tag => (
              <TagView
                key={tag.id}
                onPress={() => {
                  onTagPress && onTagPress(tag.id);
                }}
                name={tag.name}
                theme={tag.color}
              />
            ))}
          </>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);
type TagViewProps = IBoxProps & {
  name: string;
  theme: string;
  textColor?: string;
  onPress: () => void;
};
const TagView = ({
  name,
  theme,
  textColor: color,
  onPress,
  ...p
}: TagViewProps) => {
  const textColor = useContrastText(theme);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Box
        justifyContent="center"
        px="20px"
        w="100%"
        h="110px"
        bg={theme}
        {...p}
      >
        <Text fontSize="xl" color={color ?? textColor}>
          {name}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default AddTagSheet;
