import { database } from "@/db/db";
import { Tables } from "@/db/models/schema";
import Tag from "@/db/models/tag";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { MotiPressable } from "moti/interactions";
import { Box, ITextProps, Text, useContrastText } from "native-base";
import * as React from "react";
import { useObservable } from "rxjs-hooks";
import AddTagSheet from "./AddTagSheet";

type AddTagProps = {
  tagsIDs: string[];
  setTagsIDs: React.Dispatch<React.SetStateAction<string[]>>;
};
export default function AddTag({ tagsIDs, setTagsIDs }: AddTagProps) {
  const tags = useObservable(
    () => database.get<Tag>(Tables.Tag).query().observe(),
    []
  );
  const addTagSheetRef = React.useRef<BottomSheetModalMethods>(null);
  return (
    <Box flexDir="row">
      {tags.map(tag => {
        if (!tagsIDs.includes(tag.id)) return null;
        return (
          <MotiPressable
            animate={({ pressed }) => {
              "worklet";
              return {
                scale: pressed ? 0.9 : 1,
              };
            }}
            key={tag.id}
            onPress={() => {
              setTagsIDs(ids => ids.filter(i => i != tag.id));
            }}
          >
            <TagChip name={tag.name} theme={tag.color} />
          </MotiPressable>
        );
      })}
      <TagChip
        borderWidth={1}
        borderColor="em.3"
        borderStyle="dashed"
        borderRadius={10}
        name="add tag"
        theme="transparent"
        onPress={() => {
          addTagSheetRef.current?.present();
        }}
      />
      <AddTagSheet onPress={() => {}} ref={addTagSheetRef} tags={tags} />
    </Box>
  );
}
const TagChip = ({
  name,
  theme: bg,
  ...p
}: ITextProps & { name: string; theme: string }) => {
  const textColor = useContrastText(bg);
  return (
    <Text
      style={{ marginEnd: 10 }}
      mt="10px"
      px="3"
      alignItems="center"
      textAlign="center"
      py="1"
      fontSize="md"
      bg={bg}
      color={textColor}
      borderRadius={10}
      {...p}
    >
      {name}
    </Text>
  );
};
