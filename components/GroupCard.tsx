import { Box, Text } from "native-base";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { listThemes, listThemesEnum } from "./TaskCard";
type GroupCardProps = {
  theme: listThemesEnum;
};
const GroupCard = ({ theme }: GroupCardProps) => {
  const t = listThemes[theme];
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <Box
        my="5px"
        borderRadius="20px"
        style={{
          borderTopEndRadius: 5,
          borderBottomStartRadius: 5,
        }}
        bg={`${t.mainColor}:alpha.50`}
        px="20px"
        py="10px"
      >
        <Box>
          <Text color={t.textColor}>Work</Text>
          <Text color={t.textColor} fontSize={20}>
            Write Blog Post
          </Text>
          <Text color={t.textColor}>5 subtasks</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
export default GroupCard;
