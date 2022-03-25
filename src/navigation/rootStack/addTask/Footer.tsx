import React from "react";
import { Box, Text } from "native-base";

const Footer = ({ keyboardVisible }: { keyboardVisible: boolean }) => {
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
        <Box
          borderRadius="xl"
          justifyContent="center"
          alignItems="center"
          opacity={!keyboardVisible ? 1 : 0}
          w="100%"
          bg="gray.900"
          h="64px"
        >
          <Text color="white" textAlign="center" fontSize={18}>
            Create New task
          </Text>
        </Box>
      )}
    </Box>
  );
};
export default Footer;
