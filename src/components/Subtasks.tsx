import { subtask } from "@/db/models/Task";
import { Feather } from "@expo/vector-icons";
import { Text, Box, Icon, Input } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, Pressable, TextInput } from "react-native";
import CheckBox from "./CheckBox";

type SubtaskCardProps = Partial<subtask> & {
  color: string;
  onToggle?: () => void;
  onDelete?: () => void;
  changeSubtaskName: (newName: string) => void;
};
export const SubtaskCard = React.forwardRef<TextInput, SubtaskCardProps>(
  (
    { onToggle, isCompleted, color, name, changeSubtaskName, onDelete },
    ref
  ) => {
    return (
      <Box py="3px" flexDirection="row" alignItems="center" mb="10px">
        <CheckBox value={!!isCompleted} onToggle={onToggle} color={color} />
        <Input
          ref={ref}
          fontSize="lg"
          variant="unstyled"
          textAlign={I18nManager.isRTL ? "right" : "left"}
          multiline
          blurOnSubmit
          flex={1}
          color={color}
          textDecorationLine={isCompleted ? "line-through" : undefined}
          defaultValue={name}
          onEndEditing={v => {
            changeSubtaskName(v.nativeEvent.text);
          }}
          p="0"
          m="0"
        />
        <Pressable style={{ marginStart: 10, padding: 4 }} onPress={onDelete}>
          <Icon as={<Feather name="x" />} size={21} color={color} />
        </Pressable>
      </Box>
    );
  }
);

export type AddSubtaskProps = {
  onAdd: (name: string) => void;
  color: string;
};
export const AddSubtask = ({ onAdd, color }: AddSubtaskProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<TextInput>(null);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (isOpen) {
      ref.current?.focus();
    }
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <SubtaskCard
          changeSubtaskName={name => {
            onAdd(name);
            setIsOpen(false);
          }}
          ref={ref}
          isCompleted={false}
          color={color}
          onDelete={() => {
            setIsOpen(false);
          }}
        />
      )}

      <Pressable
        onPress={() => {
          setIsOpen(true);
          ref.current?.focus();
        }}
        style={{ marginStart: 10 }}
      >
        <Text _dark={{ color: "blue.400" }} color="blue.500" fontSize="md">
          {t("add")} {t("subtask", { count: 1 })}
        </Text>
      </Pressable>
    </>
  );
};
