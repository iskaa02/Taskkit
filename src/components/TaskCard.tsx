import useAccent from "@/hooks/useAccent";
import { listThemeType } from "@/theme/listThemes";
import { Text, useTheme } from "native-base";
import * as React from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import CheckBox from "./CheckBox";
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
          elevation: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
        },
        s,
      ]}
    >
      <CheckBox value={isCompleted} setValue={setIsCompleted} color={accent} />

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
