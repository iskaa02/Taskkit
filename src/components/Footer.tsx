import { Box, ITextProps, Text } from "native-base";
import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

type FooterProps = {
  keyboardVisible?: boolean;
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: ITextProps;
};
const Footer = ({
  keyboardVisible,
  label,
  onPress,
  style,
  textStyle,
}: FooterProps) => {
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
          activeOpacity={0.7}
          style={[
            {
              elevation: 3,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              opacity: !keyboardVisible ? 1 : 0,
              width: "100%",
              height: 64,
              backgroundColor: "#232323",
            },
            style,
          ]}
        >
          <Text color="white" textAlign="center" fontSize={18} {...textStyle}>
            {label}
          </Text>
        </TouchableOpacity>
      )}
    </Box>
  );
};
export default Footer;
