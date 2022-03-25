import { LeftAccentCard } from "@/components/Cards";
import StatusBar from "@/components/StatusBar";
import { listThemesEnum } from "@/theme/listThemes";
import { ScrollView, Text } from "native-base";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListStackScreenProps } from "./Stack";

export default function TaskListGroup({
  navigation,
}: ListStackScreenProps<"Root">) {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView px="10px">
        <Text fontSize={32} mx="10px" my="3" bold color="em.1">
          Lists
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push("List", { theme: "zest" });
          }}
        >
          <ListCard theme="zest" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.push("List", { theme: "pink" });
          }}
        >
          <ListCard theme="pink" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.push("List", { theme: "ocean" });
          }}
        >
          <ListCard theme="ocean" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.push("List", { theme: "mint" });
          }}
        >
          <ListCard theme="mint" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
type ListCardProps = {
  theme: listThemesEnum;
};
const ListCard = ({ theme }: ListCardProps) => {
  return (
    <LeftAccentCard theme={theme}>
      <Text fontSize={20} bold>
        Hello World
      </Text>
      <Text fontSize={16}>5 Task left</Text>
    </LeftAccentCard>
  );
};
