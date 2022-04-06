import React from "react";
import { Box, Text } from "native-base";
import { TouchableOpacity } from "react-native";

type FooterProps = {
  keyboardVisible?: boolean;
  label: string;
  onPress?: () => void;
};
const Footer = ({ keyboardVisible, label, onPress }: FooterProps) => {
  return (
    <Box
      w="100%"
      h="64px"
      px="20px"
      pb="5"
      position="absolute"
      bottom="0"
      justifyContent="center"
      alignItems="center"
    >
      {keyboardVisible ? null : (
        <TouchableOpacity
          onPress={onPress}
          style={{
            elevation: 3,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            opacity: !keyboardVisible ? 1 : 0,
            width: "100%",
            height: 64,
            backgroundColor: "#232323",
          }}
        >
          <Text color="white" textAlign="center" fontSize={18}>
            {label}
          </Text>
        </TouchableOpacity>
      )}
    </Box>
  );
};
export default Footer;
