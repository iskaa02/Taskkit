import { Box, Input, Pressable, Text, useColorModeValue } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native";
import Autolink from "react-native-autolink";

type DescriptionProps = {
  text: string;
  onChange: (n: string) => void;
  accent: string;
};

export default function Description({
  text,
  accent,
  onChange,
}: DescriptionProps) {
  const defaultTextColor = useColorModeValue("#fff", "#000");
  const [editable, setEditable] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);
  const { t } = useTranslation();
  React.useEffect(() => {
    if (editable) inputRef.current?.focus();
  }, [editable]);
  if (!text && !editable)
    return (
      <Box px="20px" py="15px">
        <Pressable
          onPress={() => {
            setEditable(true);
          }}
          _pressed={{ opacity: 0.7 }}
          w="100%"
          py="2"
          rounded="lg"
          borderStyle="dashed"
          borderWidth={2}
          justifyContent="center"
          alignItems="center"
          borderColor="em.1:alpha.70"
          bg="em.1:alpha.10"
        >
          <Text fontSize="lg">{t("add") + " " + t("description")}</Text>
        </Pressable>
      </Box>
    );

  return (
    <Pressable
      px="15px"
      py="10px"
      bg={accent}
      onLongPress={() => {
        setEditable(true);
      }}
    >
      <Box
        px="5px"
        borderColor={editable ? "em.10:alpha.30" : "transparent"}
        rounded="md"
        borderWidth={1}
      >
        {editable ? (
          <Input
            fontSize={18}
            ref={inputRef}
            variant="unstyled"
            textAlign="left"
            selectionColor="em.10"
            color={defaultTextColor}
            multiline
            defaultValue={text}
            onEndEditing={i => {
              setEditable(false);
              onChange(i.nativeEvent.text);
            }}
            p="0"
            m="0"
          />
        ) : null}
        {editable ? null : (
          <Autolink
            textProps={{
              style: {
                fontSize: 18,
                color: defaultTextColor,
              },
            }}
            linkStyle={{
              fontSize: 18,
              textDecorationLine: "underline",
              color: defaultTextColor,
            }}
            text={text}
          />
        )}
      </Box>
    </Pressable>
  );
}
