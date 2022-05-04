import BottomSheetModal from "@/components/BottomSheetModal";
import Footer from "@/components/Footer";
import Switch from "@/components/Switch";
import { repeatType } from "@/db/models/scheduleNotification";
import Task from "@/db/models/Task";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import Label from "@/navigation/addTask/Label";
import { Reminders } from "@/navigation/addTask/Reminders";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import dayjs from "dayjs";
import { Box, Input, KeyboardAvoidingView, useTheme } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

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
  const [reminderRepeat, setReminderRepeat] = React.useState<repeatType>(
    task.repeat
  );

  const surface = useTheme().colors.surface;
  const sheetRef = React.useRef<BottomSheetModalMethods>(null);
  // @ts-ignore
  React.useImperativeHandle(ref, () => sheetRef.current);
  const { t } = useTranslation();
  return (
    <BottomSheetModal
      snapPoints={["90%"]}
      stackBehavior="push"
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
              h="40px"
              defaultValue={name}
              onChangeText={i => setName(i)}
              fontSize="lg"
            />

            <Label mb={2} l={t("description")} mt="5" />

            <Input
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
                style={{ marginStart: "auto" }}
                value={withReminder}
                onValueChange={() => {
                  setWithReminder(i => !i);
                  setReminder(reminder ?? dayjs().toDate());
                }}
              />
            </Box>
            <Reminders
              active={withReminder}
              initialRepeat={task.repeat}
              date={reminder ?? dayjs().toDate()}
              setRepeat={setReminderRepeat}
              //@ts-ignore
              setDate={setReminder}
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
              repeat: reminderRepeat,
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
