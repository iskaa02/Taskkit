import { listThemesEnum } from "@/theme/listThemes";
import Color from "color";
import { Box, useTheme } from "native-base";
import * as React from "react";
type ListCardProps = {
  theme: listThemesEnum;
  children: React.ReactNode;
};
export function LeftAccentCard({ theme, children }: ListCardProps) {
  // @ts-ignore
  const t = useTheme().colors[theme];
  const surface = useTheme().colors.surface;
  const bg = Color(t.main).mix(Color(surface), 0.2).hex();

  const accentBg = !!t.secondary ? t.secondary : t.main;
  return (
    <Box
      mb="3"
      flexDir={"row"}
      bg={!!t.secondary ? bg : "surface"}
      px="3"
      py="1"
      borderRadius="10px"
    >
      <Box
        w="4px"
        style={{ marginEnd: 15 }}
        my="1"
        bg={accentBg}
        borderRadius="3px"
      />
      <Box>{children}</Box>
    </Box>
  );
}
