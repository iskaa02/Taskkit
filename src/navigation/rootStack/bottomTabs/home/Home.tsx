import StatusBar from "@/components/StatusBar";
import { RootTabScreenProps } from "@/navigation/types";
import { Feather } from "@expo/vector-icons";
import { Box, Icon, Text, useTheme } from "native-base";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <Box flex={1}>
      <ScrollView>
        <StatusBar animated />
        <Box shadow={2} pb={2} px={5} bg="surface">
          <Text fontSize={18}>Hello</Text>
          <Text fontSize={32} fontWeight="bold">
            ISKAA
          </Text>
          <Text fontSize={20} fontWeight="semibold">
            5 Tasks for today
          </Text>
        </Box>
      </ScrollView>
      <Fab onPress={() => navigation.push("AddTask")} />
    </Box>
  );
}
// const enhance = withObservables(["task"], ({ task }: { task: Task }) => task);
// export default enhance(HomeScreen);
export default HomeScreen;

type FabProps = {
  onPress: () => void;
};
const Fab = ({ onPress }: FabProps) => {
  const em1 = useTheme().colors.em[1];
  return (
    <Box w="100%" px="20px" pb="20px" position="absolute" bottom="0">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          borderRadius: 30,
          alignSelf: "flex-end",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: em1,
          width: 60,
          height: 60,
        }}
      >
        <Icon as={<Feather name="plus" />} color="em.10" />
      </TouchableOpacity>
    </Box>
  );
};
