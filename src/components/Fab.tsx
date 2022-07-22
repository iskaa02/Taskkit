import { Feather } from "@expo/vector-icons";
import { Box, Icon, useTheme } from "native-base";
import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

type FabProps = {
  onPress?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
};
export default function Fab({
  children = <Icon as={Feather} name="plus" size="30px" color="em.1" />,
  onPress,
  style,
}: FabProps) {
  const surface = useTheme().colors.surface;
  return (
    <Box w="100%" px="20px" pb="20px" position="absolute" bottom="0">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          {
            borderRadius: 30,
            alignSelf: "flex-end",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: surface,
            elevation: 1,
            width: 60,
            height: 60,
          },
          style,
        ]}
        children={children}
      />
    </Box>
  );
}
