import { listThemeType } from "@/theme/listThemes";
import Color from "color";
import { Box, useTheme } from "native-base";
import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
type ListCardProps = {
  theme: listThemeType;
  children: React.ReactNode;
  onPress: () => void;
};
export function LeftAccentCard({ theme, children, onPress }: ListCardProps) {
  const surface = useTheme().colors.surface;
  const bg = Color(theme.main).mix(Color(surface), 0.2).hex();

  const accentBg = !!theme.secondary ? theme.secondary : theme.main;
  return (
    <TouchableOpacity
      style={{
        elevation: 1,
        backgroundColor: !!theme.secondary ? bg : surface,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        paddingBottom: 4,
        marginBottom: 10,
        flexDirection: "row",
      }}
      onPress={onPress}
    >
      <Box
        w="4px"
        style={{ marginEnd: 15 }}
        my="1"
        bg={accentBg}
        borderRadius="3px"
      />
      <Box>{children}</Box>
    </TouchableOpacity>
  );
}
