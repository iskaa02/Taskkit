// import {
//   StatusBar,
// } from "expo-status-bar";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { Box, Text } from "native-base";
import React, { useCallback, useMemo } from "react";
import { StatusBar } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBackdrop from "../components/Backdrop";
import GroupCard from "../components/GroupCard";
import { listThemes, listThemesEnum } from "../components/TaskCard";
import { RootTabScreenProps } from "../types";

export default function CalendarScreen({}: RootTabScreenProps<"Calendar">) {
  const isFocused = useIsFocused();
  const [BSindex, setBSindex] = React.useState(0);
  return (
    <SafeAreaView style={{ backgroundColor: "#353535", flex: 1 }}>
      {isFocused ? (
        <StatusBar
          translucent
          barStyle={BSindex == 0 ? "light-content" : "dark-content"}
          // animated
        />
      ) : null}

      <Box bg="#353535" py="8" px="2">
        <Calendar
          theme={{
            backgroundColor: "#353535",
            calendarBackground: "#353535",
            arrowColor: "white",
            monthTextColor: "white",
            textDisabledColor: "rgba(255,255,255,0.3)",
            dayTextColor: "white",
            selectedDayTextColor: "black",
          }}
          markingType={"multi-dot"}
        />
      </Box>
      <Agenda {...{ BSindex, setBSindex }} />
    </SafeAreaView>
  );
}
type AgendaProps = {
  BSindex: number;
  setBSindex: React.Dispatch<React.SetStateAction<number>>;
};
const Agenda = ({ BSindex, setBSindex }: AgendaProps) => {
  const snapPoints = useMemo(() => ["40%", "100%"], []);
  const onChange = useCallback(
    (i: number) => {
      setBSindex(i);
    },
    [BSindex]
  );
  return (
    <BottomSheet
      backdropComponent={CustomBackdrop}
      onChange={onChange}
      index={BSindex}
      handleIndicatorStyle={{
        width: 45,
        marginTop: 8,
      }}
      snapPoints={snapPoints}
    >
      <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Separator label="Today" />
        <AgendaCard theme="purple" />
        <AgendaCard theme="zest" />
        <Separator label="Mar 13th" />
        <AgendaCard theme="lightBlue" />
        <AgendaCard theme="pink" />
        <AgendaCard theme="givry" />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

type AgendaCardProps = {
  theme: listThemesEnum;
};
type SeparatorProps = {
  label: string;
};
const Separator = ({ label }: SeparatorProps) => {
  return (
    <Box mt="5" px="20px">
      <Text fontSize={28} bold color="black">
        {label}
      </Text>
    </Box>
  );
};
const AgendaCard = ({ theme }: AgendaCardProps) => {
  const t = listThemes[theme];
  return (
    <Box flexDirection="row" px="20px" mt={3}>
      <Box
        w="8px"
        borderRadius="3px"
        style={{ marginEnd: 15 }}
        bg={t.mainColor}
      />
      <Box>
        <Text color="gray.500" fontSize={16}>
          9:00 Am
        </Text>
        <Text color="gray.500" fontSize={16}>
          Thu
        </Text>
        <Box w="70%" h="1px" bg="rgba(0,0,0,0.2)" />
        <Text color="gray.600" fontSize={20} bold>
          Finish math homework
        </Text>
        <Text color="gray.500" fontSize={16}>
          College
        </Text>
      </Box>
    </Box>
  );
};
