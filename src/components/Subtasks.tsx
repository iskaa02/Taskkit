import { subtask } from "@/db/models/Task";
import { Feather } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import { Icon, Input, Text } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  I18nManager,
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputSubmitEditingEventData,
} from "react-native";
import CheckBox from "./CheckBox";

type SubtaskCardProps = Partial<subtask> & {
  color: string;
  onToggle?: () => void;
  onDelete?: () => void;
  onEndEditing?: (newName: string) => void;
  onSubmitEditing?: (
    i: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  blurOnSubmit?: boolean;
  index?: number;
};
export const SubtaskCard = React.forwardRef<TextInput, SubtaskCardProps>(
  (
    {
      onToggle,
      isCompleted,
      color,
      index,
      name,
      onEndEditing,
      onDelete,
      onSubmitEditing,
      blurOnSubmit = true,
    },
    ref
  ) => {
    return (
      <MotiView
        from={{
          opacity: 0,
          marginBottom: 0,
          paddingVertical: 3,
        }}
        animate={{
          opacity: 1,
          marginBottom: 10,
          paddingVertical: 3,
        }}
        exit={{
          marginBottom: -0.1,
          opacity: 0,
          paddingVertical: 0,
          maxHeight: -10,
        }}
        transition={{ delay: index ? index * 40 : 0, damping: 25 }}
        style={{ flexDirection: "row" }}
      >
        <CheckBox value={!!isCompleted} onToggle={onToggle} color={color} />
        <Input
          ref={ref}
          fontSize="lg"
          variant="unstyled"
          textAlign={I18nManager.isRTL ? "right" : "left"}
          flex={1}
          color={color}
          multiline={blurOnSubmit}
          textDecorationLine={isCompleted ? "line-through" : undefined}
          blurOnSubmit={blurOnSubmit}
          defaultValue={name}
          onEndEditing={v => {
            onEndEditing && onEndEditing(v.nativeEvent.text);
          }}
          onSubmitEditing={onSubmitEditing}
          p="0"
          m="0"
        />
        <Pressable
          style={{ marginStart: 10, padding: 4 }}
          hitSlop={5}
          onPress={onDelete}
        >
          <Icon as={<Feather name="x" />} size={21} color={color} />
        </Pressable>
      </MotiView>
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
      <AnimatePresence>
        {isOpen && (
          <SubtaskCard
            blurOnSubmit={false}
            onSubmitEditing={i => {
              if (!i.nativeEvent.text) {
                setIsOpen(false);
                return;
              }
              onAdd(i.nativeEvent.text);
              ref.current?.clear();
            }}
            // onEndEditing={t => {
            //   onAdd(t);
            //   setIsOpen(false);
            // }}
            ref={ref}
            isCompleted={false}
            color={color}
            onDelete={() => {
              setIsOpen(false);
            }}
          />
        )}
      </AnimatePresence>

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
