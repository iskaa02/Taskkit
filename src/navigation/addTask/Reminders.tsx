import SelectSheet from "@/components/Select";
import { repeatType } from "@/db/models/scheduleNotification";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import dayjs from "dayjs";
import { Box, Icon, Text, useColorModeValue } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { DatePicker } from "../../hooks/DatePicker";

type RemindersProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setRepeat: React.Dispatch<React.SetStateAction<repeatType>>;
  initialRepeat?: repeatType;
  active: boolean;
};
export const Reminders = ({
  active,
  date,
  setDate,
  setRepeat: setRepeatType,
  initialRepeat,
}: RemindersProps) => {
  const colorIntensity = useColorModeValue("200", "400");
  const showDatePicker = DatePicker(date, setDate);
  const sheetRef = React.useRef<BottomSheetModalMethods>(null);
  const { t } = useTranslation();
  const repeatItems: { label: string; type: repeatType }[] =
    React.useMemo(() => {
      return [
        { label: t("none"), type: null },
        { label: t("every") + " " + t("day"), type: "daily" },
        { label: t("every") + " " + dayjs(date).format("ddd"), type: "weekly" },
        { label: t("every") + " " + t("month"), type: "monthly" },
      ];
    }, [date]);
  const [innerRepeat, setInnerRepeat] = React.useState(() => {
    if (initialRepeat) {
      const d = repeatItems.find(i => i.type === initialRepeat);
      if (d) return d;
    }
    return repeatItems[0];
  });
  return (
    <Box
      opacity={active ? 1 : 0.5}
      pointerEvents={active ? "auto" : "none"}
      mt="5"
      justifyContent="space-around"
      alignItems="flex-start"
      flexDirection="row"
    >
      <Button
        onPress={() => showDatePicker()}
        label={dayjs(date).format("MMM D\nhh:mm A")}
        color="black"
        bg={`blue.${colorIntensity}`}
        icon={<Feather name="watch" />}
      />
      <Button
        onPress={() => {
          sheetRef.current?.present();
        }}
        label={innerRepeat.label}
        color="black"
        bg={`red.${colorIntensity}`}
        icon={<Feather name="repeat" />}
      />
      <SelectSheet
        onChange={i => {
          const repeat = repeatItems.find(item => i === item.label);
          if (repeat) {
            setInnerRepeat(repeat);
            setRepeatType(repeat.type);
          }
        }}
        value={innerRepeat.label}
        items={repeatItems.map(i => i.label)}
        ref={sheetRef}
      />
    </Box>
  );
};
type ButtonProps = {
  icon: React.ReactNode;
  label?: string;
  bg: string;
  color: string;
  onPress?: () => void;
};
const Button = ({ icon, bg, color, label, onPress }: ButtonProps) => {
  return (
    <Box w="70px" justifyContent="center" alignItems="center">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.4}
        style={{ borderRadius: 100, width: 60, height: 60 }}
      >
        <Box
          w="100%"
          h="100%"
          borderRadius={10}
          justifyContent="center"
          alignItems="center"
          bg={bg}
        >
          <Icon as={icon} color={color} size={28} />
        </Box>
      </TouchableOpacity>
      <Text mt="1" textAlign="center">
        {label}
      </Text>
    </Box>
  );
};
