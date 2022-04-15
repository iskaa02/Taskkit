import StatusBar from "@/components/StatusBar";
import { AddSubtask, SubtaskCard } from "@/components/Subtasks";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { RootStackScreenProps } from "@/navigation/navPropsType";
import {
  Box,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
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
  const [reminder, setReminder] = React.useState<Date>(new Date(Date.now()));
  const [withReminder, setWithReminder] = React.useState(true);
  const { t } = useTranslation();
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
          <Label l={t("list", { count: 2 })} mt="5" />
          <ListChips
            initialListID={route.params?.defaultList}
            {...{ database, activeListID, setActiveListID }}
          />
          <Box mb={2} mt="5" flexDirection="row" alignItems="center">
            <Label l={t("reminders")} />
            <Switch
              defaultIsChecked
              style={{ marginStart: "auto" }}
              value={withReminder}
              onChange={i => setWithReminder(i => !i)}
            />
          </Box>
          <Reminders
            active={withReminder}
            value={reminder}
            setValue={setReminder}
          />

          <Label mb={2} l={t("description")} mt="5" />

          <Input
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
          changeSubtaskName={name => {
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
