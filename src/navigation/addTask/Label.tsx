import { ITextProps, Text } from "native-base";

const Label = ({ l: title, ...p }: ITextProps & { l: string }) => {
  return (
    <Text fontSize="md" bold {...p}>
      {title}
    </Text>
  );
};

export default Label;
