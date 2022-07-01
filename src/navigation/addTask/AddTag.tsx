import TagComponent from "@/components/Tag";
import { database } from "@/db/db";
import { Tables } from "@/db/models/schema";
import TagModel from "@/db/models/tag";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Box } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useObservable } from "rxjs-hooks";
import AddTagSheet from "./AddTagSheet";

type AddTagProps = {
  tagsIDs: string[];
  setTagsIDs: React.Dispatch<React.SetStateAction<string[]>>;
};
export default function AddTag({ tagsIDs, setTagsIDs }: AddTagProps) {
  const tags = useObservable(
    () => database.get<TagModel>(Tables.Tag).query().observe(),
    []
  );
  const addTagSheetRef = React.useRef<BottomSheetModalMethods>(null);
  const { t } = useTranslation();
  return (
    <Box flexDir="row">
      {tags.map(tag => {
        if (!tagsIDs.includes(tag.id)) return null;
        return <TagComponent bg={tag.color}>{tag.name}</TagComponent>;
      })}
      <TagComponent
        variant="dashed"
        onPress={() => {
          addTagSheetRef.current?.present();
        }}
      >
        {t("add") + " " + t("tag")}
      </TagComponent>

      <AddTagSheet onPress={() => {}} ref={addTagSheetRef} tags={tags} />
    </Box>
  );
}
