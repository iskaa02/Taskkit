import { Text, ITextProps } from "native-base";
import { listThemesEnum, listThemes } from "../../components/TaskCard";

const Label = ({ l: title, ...p }: ITextProps & { l: string }) => {
  return (
    <Text fontSize={16} bold color="gray.700" {...p}>
      {title}
    </Text>
  );
};

export default Label;
