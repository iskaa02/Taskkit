import CheckBox from "@/components/CheckBox";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import { Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import useKeyboardStatus from "@/hooks/useKeyboardStatus";
import { ListStackScreenProps } from "@/navigation/navPropsType";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Database from "@nozbe/watermelondb/Database";
import dayjs from "dayjs";
import {
  Box,
  Input,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  useColorModeValue,
} from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native";
import Autolink from "react-native-autolink";
import EditHeaderButton from "../EditHeaderButton";
import { EditTaskSheet } from "./EditTaskSheet";
import { DateInfo, SubtaskSection } from "./TaskInfo";

export default function TaskScreen(p: ListStackScreenProps<"Task">) {
  return <Screen database={database} taskID={p.route.params.taskID} {...p} />;
}

type TaskScreenProps = ListStackScreenProps<"Task"> & {
  task: Task;
  database: Database;
  taskID: string;
};
const RawScreen = ({ navigation, route, task }: TaskScreenProps) => {
  const tintColor = useColorModeValue("#fff", "#000");
  const accent = useAccent(route.params.theme);
  const secondary = useAccent(route.params.theme, { flip: true });
  const sheetRef = React.useRef<BottomSheetModalMethods>(null);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: accent,
      },
      headerTintColor: tintColor,
      headerRight: () => (
        <EditHeaderButton
          onEditPress={() => {
            sheetRef.current?.present();
          }}
          onDeletePress={() => {
            database.write(async () => {
              await task.markAsDeleted();
            });
            navigation.goBack();
          }}
          name={task.name}
          tintColor={tintColor}
        />
      ),
    });
  }, [route.params, navigation]);
  const keyboardVisible = useKeyboardStatus();
  const topCheckboxColor = useColorModeValue("#fff", "#000");
  const { t } = useTranslation();
  return (
    <KeyboardAvoidingView bg="background" flex={1}>
      <EditTaskSheet ref={sheetRef} task={task} />
      <StatusBar _dark={"dark-content"} _light={"light-content"} />
      <ScrollView
        _contentContainerStyle={{
          bg: "background",
          pb: "90px",
          flexGrow: 1,
        }}
        stickyHeaderIndices={[0]}
      >
        <Box
          borderBottomWidth="1"
          borderBottomColor={"em.10"}
          bg={accent}
          px="20px"
          pb={3}
        >
          <Box flexDirection="row" alignItems="center">
            <Box alignSelf="flex-start" pt="1">
              <CheckBox
                size={25}
                iconColor={accent}
                color={topCheckboxColor}
                value={task.isCompleted}
                onToggle={() => {}}
              />
            </Box>

            <Input
              fontSize="3xl"
              fontWeight="bold"
              variant="unstyled"
              textAlign="left"
              color="em.10"
              textDecorationLine={task.isCompleted ? "line-through" : undefined}
              defaultValue={task.name}
              textBreakStrategy="balanced"
              multiline
              blurOnSubmit
              onEndEditing={e => {
                task.editTask({ name: e.nativeEvent.text });
              }}
              p="0"
            />
          </Box>
        </Box>
        <Description
          onChange={description => {
            task.editTask({ description });
          }}
          accent={accent}
          text={task.description}
        />
        <Box px="20px">
          <Box mt="4">
            {!!task.reminder?.valueOf() ? (
              <>
                <DateInfo
                  index={0}
                  iconName="calendar"
                  label={dayjs(task.reminder).format(
                    dayjs(task.reminder).isSame(Date.now(), "year")
                      ? "ddd, MMM D"
                      : "ddd, MMM D, YYYY"
                  )}
                />
                <DateInfo
                  index={1}
                  iconName="clock"
                  label={dayjs(task.reminder).format("h:mm A")}
                />
                {!task.repeat ? null : (
                  <DateInfo
                    index={2}
                    iconName="repeat"
                    label={t("r-" + task.repeat)}
                  />
                )}
              </>
            ) : null}
          </Box>
          <SubtaskSection {...{ accent, task }} />
        </Box>
      </ScrollView>
      <Footer
        keyboardVisible={keyboardVisible}
        style={{ backgroundColor: secondary, elevation: 0 }}
        textStyle={{
          color: route.params.theme.secondary ? "em.1" : "em.10",
          fontSize: 18,
          bold: true,
        }}
        label={
          !task.isCompleted ? t("mark-as-completed") : t("mark-as-uncompleted")
        }
        onPress={() => {
          task.setIsCompleted(!task.isCompleted);
        }}
      />
    </KeyboardAvoidingView>
  );
};
const Screen = withDB<TaskScreenProps, { task: Task }>(
  RawScreen,
  ["database", "taskID"],
  ({ database, taskID }) => {
    return {
      task: database.get<Task>(Tables.Task).findAndObserve(taskID),
    };
  }
);

type DescriptionProps = {
  text: string;
  onChange: (n: string) => void;
  accent: string;
};
const Description = ({ text, accent, onChange }: DescriptionProps) => {
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
            }}
            text={text}
          />
        )}
      </Box>
    </Pressable>
  );
};
