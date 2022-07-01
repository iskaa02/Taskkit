import Tag from "@/components/Tag";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import withDB from "@/db/models/withDB";
import { listThemeType } from "@/theme/listThemes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Database from "@nozbe/watermelondb/Database";
import { Box, useColorModeValue } from "native-base";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import AddListSheet from "../bottomTabs/lists/listScreen/AddListSheet";

const ListChip = ({
  name,
  theme,
  isActive,
  ...p
}: {
  name: string;
  theme: listThemeType;
  isActive?: Boolean;
}) => {
  const bg = isActive ? theme.main : useColorModeValue("gray.200", "gray.600");
  const color = isActive
    ? theme.secondary
    : useColorModeValue("gray.600", "gray.100");
  return (
    <Tag bg={bg} color={color}>
      {name}
    </Tag>
  );
};

type ListChipsProps = {
  lists: List[];
  database: Database;
  activeListID: string;
  setActiveListID: React.Dispatch<React.SetStateAction<string>>;
  initialListID?: string;
};
const ListChips = ({
  lists,
  setActiveListID,
  activeListID,
  initialListID,
}: ListChipsProps) => {
  React.useEffect(() => {
    if (activeListID) return;
    if (initialListID) {
      setActiveListID(initialListID);
    } else if (lists[0]) setActiveListID(lists[0].id);
  }, [initialListID, lists, activeListID]);
  const sheetRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();
  return (
    <Box flexDirection="row" flexWrap="wrap">
      {lists.map(list => {
        return (
          <ListChip
            isActive={list.id === activeListID}
            name={list.name}
            theme={list.theme}
          />
        );
      })}
      <Tag
        onPress={() => {
          sheetRef.current?.present();
        }}
        variant="dashed"
      >
        {t("add") + " " + t("list", { count: 1, postProcess: "interval" })}
      </Tag>
      <AddListSheet ref={sheetRef} />
    </Box>
  );
};

export default withDB<ListChipsProps, { lists: List[] }>(
  ListChips,
  ["database"],
  ({ database }) => {
    return {
      lists: database.get<List>(Tables.List).query(),
    };
  }
);
