import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import { withDB } from "@/db/models/withDB";
import { listThemeType } from "@/theme/listThemes";
import Database from "@nozbe/watermelondb/Database";
import { Box, ITextProps, Text, useColorModeValue } from "native-base";
import React from "react";
import { Pressable } from "react-native";

const ListChip = ({
  name,
  theme,
  isActive,
  ...p
}: ITextProps & {
  name: string;
  theme: listThemeType;
  isActive?: Boolean;
}) => {
  const bg = isActive ? theme.main : useColorModeValue("gray.200", "gray.600");
  const color = isActive
    ? theme.secondary
    : useColorModeValue("gray.600", "gray.100");
  return (
    <Text
      style={{ marginEnd: 10 }}
      mt="10px"
      px="3"
      alignItems="center"
      textAlign="center"
      py="1"
      fontSize={16}
      color={color}
      borderRadius={10}
      bg={bg}
      {...p}
    >
      {name}
    </Text>
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
    if (initialListID) {
      setActiveListID(initialListID);
    } else if (lists[0]) setActiveListID(lists[0].id);
  }, []);
  return (
    <Box flexDirection="row" flexWrap="wrap">
      {lists.map((list, index) => {
        return (
          <Pressable key={list.id} onPress={() => setActiveListID(list.id)}>
            <ListChip
              isActive={list.id === activeListID}
              name={list.name}
              theme={list.theme}
            />
          </Pressable>
        );
      })}
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
