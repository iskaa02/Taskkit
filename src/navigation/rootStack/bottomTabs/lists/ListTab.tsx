import { LeftAccentCard } from "@/components/Cards";
import StatusBar from "@/components/StatusBar";
import { listThemesEnum } from "@/theme/listThemes";
import { ScrollView, Text } from "native-base";
import * as React from "react";
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
        <ListCard
          onPress={() => navigation.push("List", { theme: "zest" })}
          theme="zest"
        />
        <ListCard
          onPress={() => navigation.push("List", { theme: "ocean" })}
          theme="ocean"
        />
        <ListCard
          onPress={() => navigation.push("List", { theme: "purple" })}
          theme="purple"
        />
        <ListCard
          onPress={() => navigation.push("List", { theme: "mint" })}
          theme="mint"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
type ListCardProps = {
  theme: listThemesEnum;
  onPress: () => void;
};
const ListCard = ({ theme, onPress }: ListCardProps) => {
  return (
    <LeftAccentCard onPress={onPress} theme={theme}>
      <Text fontSize={20} bold>
        Hello World
      </Text>
      <Text fontSize={16}>5 Task left</Text>
    </LeftAccentCard>
  );
};
