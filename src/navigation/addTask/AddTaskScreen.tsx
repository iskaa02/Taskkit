import StatusBar from "@/components/StatusBar";
import { AddSubtask, SubtaskCard } from "@/components/Subtasks";
import Switch from "@/components/Switch";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { repeatType } from "@/db/models/scheduleNotification";
import { Tables } from "@/db/models/schema";
import { storage } from "@/db/storage";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { RootStackScreenProps } from "@/navigation/navPropsType";
import { useFocusEffect } from "@react-navigation/native";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import {
  Box,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  useTheme,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer";
import Label from "./Label";
import ListChips from "./ListChips";
import { Reminders } from "./Reminders";

export default function AddTaskScreen({
  route,
  navigation,
}: RootStackScreenProps<"AddTask">) {
  const keyboardVisible = useKeyboardStatus();
  const [activeListID, setActiveListID] = React.useState("");
  const [subtasks, setSubtasks] = React.useState<string[]>([]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [reminder, setReminder] = React.useState<Date>(
    new Date(route.params?.date ?? Date.now())
  );
  const [reminderRepeat, setReminderRepeat] = React.useState<repeatType>(null);
  const [withReminder, setWithReminder] = React.useState(true);
  const { t } = useTranslation();
  const { surface } = useTheme().colors;
  useFocusEffect(() => {
    setBackgroundColorAsync(surface);
  });
  return (
    <KeyboardAvoidingView bg="surface" flex={1}>
      <ScrollView
        _contentContainerStyle={{
          bg: "surface",
          pb: "90px",
          flexGrow: 1,
        }}
      >
        <Box bg="surface" px="5" pt="2">
          <StatusBar />
          <Label l={t("task-title")} mb={2} />
          <Input value={name} onChangeText={i => setName(i)} fontSize="lg" />
          <Label l={t("list", { count: 2, postProcess: "interval" })} mt="5" />
          <ListChips
            initialListID={
              route.params?.defaultList ?? storage.getString("default-list")
            }
            {...{ database, activeListID, setActiveListID }}
          />
          <Box mb={2} mt="5" flexDirection="row" alignItems="center">
            <Label l={t("reminders")} />
            <Switch
              style={{ marginStart: "auto" }}
              value={withReminder}
              onValueChange={i => setWithReminder(i)}
            />
          </Box>
          <Reminders
            setRepeat={setReminderRepeat}
            initialRepeat={reminderRepeat}
            active={withReminder}
            date={reminder}
            setDate={setReminder}
          />

          <Label mb={2} l={t("description")} mt="5" />

          <Input
            selectionColor="em.10"
            value={description}
            onChangeText={i => setDescription(i)}
            fontSize="lg"
            numberOfLines={4}
            textAlignVertical="top"
            multiline={true}
          />
          <Label l={t("subtask", { count: 1 })} mt="5" />
          <AddSubtasks {...{ subtasks, setSubtasks }} />
        </Box>
      </ScrollView>
      <Footer
        containerBg="surface"
        onPress={() => {
          if (!(activeListID && name)) return;
          database
            .get<List>(Tables.List)
            .find(activeListID)
            .then(l => {
              l.addTask({
                name,
                description,
                subtasks,
                reminderRepeat,
                reminder: withReminder ? reminder : undefined,
              });
            })
            .finally(() => {
              navigation.pop();
            });
        }}
        label={t("create-new-task")}
        keyboardVisible={keyboardVisible}
      />
    </KeyboardAvoidingView>
  );
}

type AddSubtaskProps = {
  subtasks: string[];
  setSubtasks: React.Dispatch<React.SetStateAction<string[]>>;
};
function AddSubtasks({ subtasks, setSubtasks }: AddSubtaskProps) {
  return (
    <Box pt="4">
      {subtasks.map((subtask, i) => (
        <SubtaskCard
          name={subtask}
          key={i}
          color="em.1"
          isCompleted={false}
          onDelete={() => {
            setSubtasks(s => s.filter(a => a !== subtask));
          }}
          onEndEditing={name => {
            if (!name) return;
            setSubtasks(sub => {
              sub[i] = name;
              return sub;
            });
          }}
        />
      ))}
      <AddSubtask
        onAdd={i => {
          setSubtasks(tasks => [...tasks, i]);
        }}
        color={"em.1"}
      />
    </Box>
  );
}
