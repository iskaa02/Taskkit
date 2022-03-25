import useAccent from "@/hooks/useAccent";
import { listThemeType } from "@/theme/listThemes";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Icon, Pressable, Text, useTheme } from "native-base";
import * as React from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
type TaskCardProps = {
  l: string;
  theme: listThemeType;
};
export default function TaskCard({ l, theme }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const surface = useTheme().colors.surface;
  const s = useAnimatedStyle(
    () => ({
      opacity: isCompleted ? withSpring(0.8) : withSpring(1),
    }),
    [isCompleted]
  );
  const accent = useAccent(theme);
  return (
    <Animated.View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 15,
          backgroundColor: surface,
        },
        s,
      ]}
    >
      <Pressable
        w="20px"
        h="20px"
        borderRadius={10}
        borderWidth={isCompleted ? 0 : 2}
        style={{ marginEnd: 18 }}
        borderColor={accent}
        justifyContent="center"
        alignItems="center"
        onPress={() => setIsCompleted(i => !i)}
      >
        <MotiView
          style={{
            backgroundColor: accent,
            width: "105%",
            height: "105%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          animate={{
            scale: isCompleted ? 1 : 0.3,
            opacity: isCompleted ? 1 : 0,
          }}
        >
          <Icon as={<Feather name="check" />} color="em.10" size="14px" />
        </MotiView>
      </Pressable>
      <Text
        fontSize={23}
        color={accent}
        textDecorationLine={isCompleted ? "line-through" : undefined}
      >
        {l}
      </Text>
    </Animated.View>
  );
}
