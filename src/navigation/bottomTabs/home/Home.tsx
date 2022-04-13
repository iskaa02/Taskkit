import StatusBar from "@/components/StatusBar";
import { RootTabScreenProps } from "@/navigation/navPropsType";
import { getAllScheduledNotificationsAsync } from "expo-notifications";
import { Box, Text } from "native-base";
import React from "react";
import { ScrollView } from "react-native";
import { Fab } from "@/components/Fab";
function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  getAllScheduledNotificationsAsync().then(i => {
    i.forEach(n => {
      console.log(n);
    });
  });
  return (
    <Box flex={1}>
      <ScrollView>
        <StatusBar animated />
        <Box shadow={2} pb={2} px={5} bg="surface">
          <Text fontSize="lg">Hello</Text>
          <Text fontSize="3xl" fontWeight="bold">
            ISKAA
          </Text>
          <Text fontSize="xl" fontWeight="semibold">
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
