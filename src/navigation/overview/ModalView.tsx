import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Icon, Pressable, useTheme } from "native-base";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
type ModalViewProps = {
  children?: React.ReactNode;
};
export default function ModalView({ children }: ModalViewProps) {
  const { background } = useTheme().colors;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: background, flex: 1 }}>
      <Box flex={1}>
        <Box w="100%" position="absolute">
          <Pressable
            h="64px"
            alignSelf="flex-end"
            m="3"
            w="64px"
            justifyContent="center"
            alignItems="center"
            onPress={() => navigation.goBack()}
          >
            <Icon as={<Feather name="x" />} size={23} color="em.1" />
          </Pressable>
        </Box>
        <Box mb="20" />
        {children}
      </Box>
    </SafeAreaView>
  );
}
