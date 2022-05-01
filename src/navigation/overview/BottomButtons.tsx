import { database } from "@/db/db";
import Task from "@/db/models/Task";
import { Feather } from "@expo/vector-icons";
import { Box, Icon, Pressable, Text, useColorModeValue } from "native-base";
import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomButtonsProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function BottomButtons(p: BottomButtonsProps) {
  const [page, setPage] = React.useState<"main" | "today" | "later">("main");
  const { height } = useWindowDimensions();
  const a = useSafeAreaInsets();
  return (
    <>
      <Pressable
        onPress={() => {
          if (page != "main") setPage("main");
        }}
        w="100%"
        h={height - 70 - 110}
        top={70 + a.top}
        position={"absolute"}
      />
      <Pressable
        alignSelf="flex-end"
        mx="20px"
        mb="10px"
        py="5px"
        px="8px"
        borderRadius={10}
        _pressed={{ backgroundColor: "blue.700:alpha.40" }}
        onPress={() => p.setTasks(tasks => tasks.slice(1))}
      >
        <Text
          fontSize="lg"
          _dark={{ color: "lightBlue.300" }}
          _light={{ color: "lightBlue.400" }}
        >
          Skip
        </Text>
      </Pressable>
      <Box h="110px" borderColor="em.1:alpha.20" borderTopWidth={1}>
        {page !== "main" ? null : <MainButtons setPage={setPage} {...p} />}
        {page !== "today" ? null : <TodayButtons {...p} />}
      </Box>
    </>
  );
}
type BottomButtonProps = {
  onPress: () => void;
  iconName?: string;
  colorLight?: string;
  colorDark?: string;
  label: string;
  iconText?: string;
};
const BottomButton = ({
  onPress,
  iconName,
  label,
  colorLight,
  colorDark,
  iconText,
}: BottomButtonProps) => {
  const iconColor = useColorModeValue(colorLight, colorDark);
  const textColor = useColorModeValue(colorLight, colorDark);
  const { width } = useWindowDimensions();

  return (
    <Box
      style={{ marginHorizontal: (width - 55 * 4) / 8 }}
      justifyContent="center"
      alignItems="center"
    >
      <Pressable
        shadow={"1"}
        w="55px"
        h="55px"
        bg="surface"
        borderRadius={30}
        alignItems="center"
        justifyContent="center"
        onPress={onPress}
      >
        {iconText ? (
          <Text
            fontSize="2xl"
            textAlign="center"
            color={textColor}
            adjustsFontSizeToFit
          >
            {iconText}
          </Text>
        ) : (
          <Icon color={iconColor} size={23} name={iconName} as={Feather} />
        )}
      </Pressable>
      <Text color="em.2">{label}</Text>
    </Box>
  );
};

export function MainButtons({
  tasks,
  setTasks,
  setPage,
}: BottomButtonsProps & {
  setPage: React.Dispatch<React.SetStateAction<"main" | "today" | "later">>;
}) {
  return (
    <ScrollView horizontal>
      <BottomButton
        iconName="check"
        onPress={() => {
          tasks[0].setIsCompleted(true);
          setTasks(tasks => tasks.slice(1));
        }}
        label="Done"
        colorLight="green.600"
        colorDark="green.400"
      />
      <BottomButton
        iconName="coffee"
        onPress={() => {
          setPage("today");
        }}
        label="Today"
        colorLight="blue.600"
        colorDark="blue.400"
      />
      <BottomButton
        iconName="sunset"
        onPress={() => {
          tasks[0].markAsDeleted();
          setTasks(tasks => tasks.slice(1));
        }}
        label="Later"
        colorLight="yellow.600"
        colorDark="yellow.400"
      />
      <BottomButton
        iconName="x"
        onPress={() => {
          database.write(async () => {
            await tasks[0].markAsDeleted();
          });
          setTasks(tasks => tasks.slice(1));
        }}
        label="Delete"
        colorLight="red.600"
        colorDark="red.400"
      />
    </ScrollView>
  );
}

export function TodayButtons({ tasks, setTasks }: BottomButtonsProps) {
  return (
    <ScrollView horizontal>
      <BottomButton
        colorLight="blue.600"
        colorDark="blue.400"
        iconText="9"
        label="Morning"
        onPress={() => {}}
      />
      <BottomButton
        colorLight="blue.600"
        colorDark="blue.400"
        iconText="12"
        label="Noon"
        onPress={() => {}}
      />
      <BottomButton
        colorLight="blue.600"
        colorDark="blue.400"
        iconText="3"
        label="Afternoon"
        onPress={() => {}}
      />
      <BottomButton
        colorLight="blue.600"
        colorDark="blue.400"
        iconText="7"
        label="Evening"
        onPress={() => {}}
      />
      <BottomButton
        iconText="9"
        colorLight="blue.600"
        colorDark="blue.400"
        label="Night"
        onPress={() => {}}
      />
    </ScrollView>
  );
}
