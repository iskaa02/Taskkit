import { Text, ITextProps } from "native-base";
import { listThemesEnum, listThemes } from "../../components/TaskCard";

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
  const t = listThemes[theme];
  return (
    <Text
      style={{ marginEnd: 10 }}
      mt="10px"
      px="3"
      alignItems="center"
      textAlign="center"
      py="1"
      fontSize={16}
      color={t.textColor}
      opacity={isActive ? 1 : 0.4}
      borderColor={isActive ? t.textColor : `${t.mainColor}:alpha.80`}
      borderWidth={2}
      borderRadius={10}
      bg={`${t.mainColor}:alpha.80`}
      {...p}
    >
      {name}
    </Text>
  );
};
export default ListChip;
