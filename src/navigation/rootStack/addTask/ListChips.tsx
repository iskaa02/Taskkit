import { Text, ITextProps, useColorModeValue } from "native-base";
import { listThemesEnum } from "@/theme/listThemes";

const ListChip = ({
  name,
  theme,
  isActive,
  ...p
}: ITextProps & {
  name: string;
  theme: listThemesEnum;
  isActive?: Boolean;
}) => {
  const bg = isActive
    ? `${theme}.main`
    : useColorModeValue("gray.200", "gray.600");
  const color = isActive
    ? `${theme}.secondary`
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
export default ListChip;
