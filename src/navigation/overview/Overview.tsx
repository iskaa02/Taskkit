import List from "@/db/models/List";
import { Columns } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import { queryTasks } from "@/db/queries";
import useAccent from "@/hooks/useAccent";
import { Feather } from "@expo/vector-icons";
import { Q } from "@nozbe/watermelondb";
import * as NavigationBar from "expo-navigation-bar";
import { MotiView } from "moti";
import { Box, Heading, Icon, Pressable, Text, useTheme } from "native-base";
import * as React from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../navPropsType";
import BottomButtons from "./BottomButtons";
export default function Overview({
  navigation,
}: RootStackScreenProps<"Overview">) {
  const { background } = useTheme().colors;
  React.useLayoutEffect(() => {
    NavigationBar.setBackgroundColorAsync(background);
  }, []);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  React.useEffect(() => {
    queryTasks({}, Q.where(Columns.task.isCompleted, Q.eq(false)))
      .fetch()
      .then(tasks => {
        setTasks(tasks);
      });
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: background, flex: 1 }}>
      <Box pb="70px" px="20px" flex={1}>
        <Pressable onPress={() => navigation.goBack()} mt="30px" mb="10">
          <Icon as={<Feather name="arrow-left" />} size={23} color="em.1" />
        </Pressable>
        <Heading fontSize="3xl" mb="20">
          Good morning{"\n"}Ismael,
        </Heading>

        <MotiView
          animate={{ marginStart: 0 }}
          from={{ marginStart: 45 }}
          transition={{ damping: 26, delay: 500 }}
          key={tasks[0] && tasks[0].id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 40,
            marginTop: "auto",
          }}
        >
          {tasks.map((task, index) => {
            if (index === 0) return null;
            return (
              <Box
                key={task.id}
                h="25px"
                w="25px"
                bg="em.4"
                mr="5"
                borderRadius="20"
              />
            );
          })}
        </MotiView>
        {tasks.map((i, index) => {
          if (index != 0) return null;
          return <ActiveTask task={i} key={i.id} />;
        })}
      </Box>
      <BottomButtons tasks={tasks} setTasks={setTasks} />
    </SafeAreaView>
  );
}
const ActiveTask = withDB(
  ({ task, list }: { task: Task; list: List }) => {
    const { em } = useTheme().colors;
    const accent = useAccent(list.theme);
    const progress = useSharedValue(0);
    progress.value = withTiming(1, {
      duration: 600,
    });
    const animatedBackground = useAnimatedStyle(() => {
      // @ts-ignore
      const backgroundColor: string = interpolateColor(
        progress.value,
        [0, 1],
        [em[4], accent]
      );

      return {
        backgroundColor,
      };
    }, [em, accent, task]);

    return (
      <MotiView
        style={{ flexDirection: "row", alignItems: "center" }}
        key={task.id}
        from={{ bottom: 70 }}
        animate={{ bottom: 0 }}
        transition={{
          type: "timing",
          duration: 800,
          delay: 200,
        }}
      >
        <MotiView
          transition={{ delay: 200 }}
          from={{ height: 25, width: 25 }}
          key={task.id + "1"}
          style={[{ borderRadius: 20 }, animatedBackground]}
          animate={{ height: 30, width: 30 }}
        />
        <MotiView
          animate={{ opacity: 1 }}
          from={{ opacity: 0 }}
          key={task.id + "2"}
          transition={{ type: "timing", duration: 300, delay: 600 }}
        >
          <Text fontSize="2xl" mx="4" color="em.1" bold>
            {task.name}
          </Text>
        </MotiView>
      </MotiView>
    );
  },
  ["task"],
  ({ task }) => ({
    task: task,
    list: task.list,
  })
);
