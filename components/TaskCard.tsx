import { Box, Text } from "native-base";
import {
  Task,
  TouchableHighlight,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";

export const listThemes = {
  green: {
    mainColor: "#BAE2A7",
    textColor: "#2B6735",
  },
  lightBlue: {
    mainColor: "#A7DEE2",
    textColor: "#2B6367",
  },
  pink: {
    mainColor: "#E2A7A7",
    textColor: "#672B2B",
  },
  purple: {
    mainColor: "#AFA7E2",
    textColor: "#332B67",
  },
  givry: {
    mainColor: "#F7D2BF",
    textColor: "#1C0060",
  },
  dodgerBlue: {
    mainColor: "#4293FF",
    textColor: "#fff",
  },
  zest: {
    mainColor: "#E17A2D",
    textColor: "#37003E",
  },
};
export type listThemesEnum = keyof typeof listThemes;

type TaskCardProps = {
  theme: listThemesEnum;
};
const TaskCard = ({ theme }: TaskCardProps) => {
  const t = listThemes[theme];
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <Box
        w="160px"
        p={4}
        mx="10px"
        h="160px"
        borderRadius="xl"
        bg={`${t.mainColor}:alpha.50`}
      >
        <Text color={t.textColor}>College</Text>
        <Text color={t.textColor} my="auto" fontSize="lg">
          Do your math homework
        </Text>
        <Box flexDirection="row" alignItems="center" mt="auto">
          <Box
            style={{ marginEnd: 5 }}
            w="10px"
            borderRadius="full"
            h="10px"
            bg={t.textColor}
          />
          <Text color={t.textColor}>Mar 3th</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default TaskCard;
