import BottomSheetModal from "@/components/BottomSheetModal";
import Footer from "@/components/Footer";
import Task from "@/db/models/Task";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import dayjs from "dayjs";
import {
  Box,
  Input,
  KeyboardAvoidingView,
  Switch,
  useTheme,
} from "native-base";
import React from "react";
import Label from "@/navigation/addTask/Label";
import { Reminders } from "@/navigation/addTask/Reminders";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";

type EditTaskSheetProps = {
  task: Task;
};
export const EditTaskSheet = React.forwardRef<
  BottomSheetModalMethods,
  EditTaskSheetProps
>(({ task }, ref) => {
  const keyboardVisible = useKeyboardStatus();
  const [name, setName] = React.useState(task.name);
  const [description, setDescription] = React.useState(task.description);
  const [reminder, setReminder] = React.useState<Date | null>(task.reminder);
  const [withReminder, setWithReminder] = React.useState(!!task.reminder);

  const surface = useTheme().colors.surface;
  const sheetRef = React.useRef<BottomSheetModalMethods>(null);
  // @ts-ignore
  React.useImperativeHandle(ref, () => sheetRef.current);
  const { t } = useTranslation();

  return (
    <BottomSheetModal
      snapPoints={["90%"]}
      onDismiss={() => {
        setName(task.name);
        setDescription(task.description);
        setReminder(task.reminder);
        setWithReminder(!!task.reminder);
      }}
      enableDismissOnClose
      ref={sheetRef}
      backgroundStyle={{
        backgroundColor: surface,
      }}
    >
      <KeyboardAvoidingView bg="surface" flex={1}>
        <BottomSheetScrollView
          contentContainerStyle={{
            backgroundColor: surface,
            paddingBottom: 90,
            flexGrow: 1,
          }}
        >
          <Box bg="surface" px="5" pt="2">
            <Label l={t("task-title")} mb={2} />
            <Input
              textAlign={I18nManager.isRTL ? "right" : "left"}
              h="40px"
              defaultValue={name}
              onChangeText={i => setName(i)}
              fontSize="lg"
            />

            <Label mb={2} l={t("description")} mt="5" />

            <Input
              textAlign={I18nManager.isRTL ? "right" : "left"}
              defaultValue={description}
              onChangeText={i => setDescription(i)}
              fontSize="lg"
              numberOfLines={4}
              textAlignVertical="top"
              multiline={true}
            />
            <Box mb={2} mt="5" flexDirection="row" alignItems="center">
              <Label l={t("reminders")} />
              <Switch
                defaultIsChecked={!!task.reminder}
                style={{ marginStart: "auto" }}
                value={withReminder}
                onChange={() => {
                  setWithReminder(i => !i);
                  setReminder(reminder ?? dayjs().toDate());
                }}
              />
            </Box>
            <Reminders
              active={withReminder}
              value={reminder ?? dayjs().toDate()}
              //@ts-ignore
              setValue={setReminder}
            />
          </Box>
        </BottomSheetScrollView>
        <Footer
          onPress={() => {
            if (!name) return;
            task.editTask({
              name,
              description,
              reminder: withReminder ? reminder : null,
            });
            sheetRef.current?.close();
          }}
          label={t("save")}
          keyboardVisible={keyboardVisible}
        />
      </KeyboardAvoidingView>
    </BottomSheetModal>
  );
});
