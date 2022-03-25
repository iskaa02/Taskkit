// import {
//   StatusBar,
// } from "expo-status-bar";
import CustomBackdrop from "@/components/Backdrop";
import { LeftAccentCard } from "@/components/Cards";
import StatusBar from "@/components/StatusBar";
import { RootTabScreenProps } from "@/navigation/types";
import { listThemes, listThemesEnum } from "@/theme/listThemes";
import { LIGHT_MODE } from "@/theme/theme";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Box, Text, useTheme } from "native-base";
import React, { useCallback, useMemo } from "react";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarScreen({}: RootTabScreenProps<"Calendar">) {
  const [BSindex, setBSindex] = React.useState(0);
  return (
    <SafeAreaView style={{ backgroundColor: "#353535", flex: 1 }}>
      <StatusBar
        barStyle={BSindex == 0 ? "light-content" : "dark-content"}
        _dark="light-content"
      />

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
  const onChange = useCallback((i: number) => {
    setBSindex(i);
  }, []);
  const colors = useTheme().colors;
  return (
    <BottomSheet
      backdropComponent={CustomBackdrop}
      onChange={onChange}
      index={BSindex}
      handleIndicatorStyle={{
        width: 45,
        marginTop: 8,
        backgroundColor: colors.em[2],
      }}
      backgroundStyle={{ backgroundColor: colors.background }}
      snapPoints={snapPoints}
    >
      <BottomSheetScrollView
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 10 }}
      >
        <Separator label="Today" />
        <AgendaCard theme="purple" />
        <AgendaCard theme="ocean" />
        <Separator label="Mar 13th" />
        <AgendaCard theme="lightBlue" />
        <AgendaCard theme="mint" />
        <AgendaCard theme="givry" />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

type SeparatorProps = {
  label: string;
};
const Separator = ({ label }: SeparatorProps) => {
  return (
    <Box mt="5" px="10px">
      <Text fontSize={28} bold>
        {label}
      </Text>
    </Box>
  );
};

type AgendaCardProps = {
  theme: listThemesEnum;
};
const AgendaCard = ({ theme }: AgendaCardProps) => {
  const mainColor = React.useMemo(() => {
    if (listThemes[theme].secondary) {
      return LIGHT_MODE.em[2];
    }
    return "em.2";
  }, [theme]);
  return (
    <LeftAccentCard theme={theme}>
      <Box justifyContent="center" alignItems="flex-start" flexDir={"row"}>
        <Box w="73%">
          <Text color={mainColor} fontSize={20} bold>
            Finish math homework
          </Text>
          <Text color={LIGHT_MODE.em[3]} fontSize={16}>
            College
          </Text>
        </Box>
        <Box style={{ marginStart: "auto" }}>
          <Text color={LIGHT_MODE.em[3]} fontSize={16}>
            9:00 AM
          </Text>
          <Text color={LIGHT_MODE.em[3]} fontSize={14}>
            Thu
          </Text>
        </Box>
      </Box>
    </LeftAccentCard>
  );
};
