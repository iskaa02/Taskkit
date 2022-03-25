import StatusBar from "@/components/StatusBar";
import useAccent from "@/hooks/useAccent";
import { Feather } from "@expo/vector-icons";
import { Box, Icon, Text, useColorModeValue, VStack } from "native-base";
import * as React from "react";
import { ListStackScreenProps } from "./Stack";
export default function TaskScreen({
  route,
  navigation,
}: ListStackScreenProps<"Task">) {
  const tintColor = useColorModeValue("#fff", "#000");
  const theme = route.params.theme;
  const accent = useAccent(theme);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: accent,
      },
      headerTintColor: tintColor,
    });
  }, [route.params]);
  return (
    <Box bg="surface" flex={1}>
      <StatusBar _dark={"dark-content"} _light={"light-content"} />
      <Box bg={accent} px="20px" pb="20px">
        <Text bold color={"em.10"} fontSize={32}>
          {route.params.label}
        </Text>

        <Text mt={4} color={"em.10"} fontSize={16}>
          LLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsumorem Ipsum
          LLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsumorem Ipsum
        </Text>
      </Box>

      <Box px="20px">
        <VStack space={4} mt={4}>
          <ExtraInfo iconName="grid" label="Personal" />
          <ExtraInfo iconName="clock" label="9:00 AM" />
          <ExtraInfo iconName="calendar" label="Friday, 4th March" />
          <ExtraInfo iconName="paperclip" label="3 Notes" />
          <ExtraInfo iconName="repeat" label="Every week" />
        </VStack>
        <Text mt={7} bold color="em.1" fontSize={22}>
          SubTasks
        </Text>
      </Box>
    </Box>
  );
}
type ExtraInfoProps = {
  iconName: string;
  label: string;
};
const ExtraInfo = ({ iconName, label }: ExtraInfoProps) => {
  return (
    <Box flexDir="row" alignItems="center">
      <Icon
        style={{ marginEnd: 20 }}
        as={<Feather />}
        name={iconName}
        color="em.2"
        size="22px"
      />
      <Text fontSize={16} color="em.2">
        {label}
      </Text>
    </Box>
  );
};
