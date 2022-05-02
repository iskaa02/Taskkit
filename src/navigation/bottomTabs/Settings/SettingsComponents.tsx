import { Feather } from "@expo/vector-icons";
import { Box, Icon, Text } from "native-base";
import * as React from "react";
import { I18nManager, Pressable } from "react-native";
type SettingsContainerProps = {
  children: React.ReactNode;
  iconName?: string;
  onPress?: () => void;
  withEndArrow?: boolean;
};
export const SettingsContainer = ({
  children,
  iconName,
  onPress,
  withEndArrow,
}: SettingsContainerProps) => {
  const component = (
    <Box
      flexDirection="row"
      px="10px"
      alignItems="center"
      py="2"
      _dark={{ bg: "surface" }}
      bg="em.6"
      mx="4"
      mb="10px"
      borderRadius="lg"
    >
      {!iconName ? null : <SettingsIcon iconName={iconName} />}
      <Box
        alignItems="center"
        flexDirection="row"
        flex={1}
        justifyContent="space-between"
      >
        {children}
      </Box>
      {!withEndArrow ? null : (
        <SettingsIcon
          me={0}
          iconName={I18nManager.isRTL ? "chevron-left" : "chevron-right"}
        />
      )}
    </Box>
  );
  if (onPress) {
    return (
      <Box>
        <Pressable onPress={onPress}>{component}</Pressable>
      </Box>
    );
  }
  return component;
};
export const SettingsLabel = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Text isTruncated textAlign="justify" color="em.2" mb="1" fontSize="lg">
      {children}
    </Text>
  );
};
export const SettingsHeading = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Text
      letterSpacing="2xl"
      isTruncated
      px="20px"
      mb="2"
      color="em.3"
      fontSize="sm"
      textTransform="uppercase"
      // bold
    >
      {children}
    </Text>
  );
};

type SettingsIconProps = {
  iconName: string;
  me?: number;
  ms?: number;
  mx?: string;
  color?: string;
};
export const SettingsIcon = ({
  iconName,
  me = 5,
  ms,
  mx,
  color = "em.2",
}: SettingsIconProps) => {
  return (
    <Icon
      size={25}
      color={color}
      style={{ marginEnd: me, marginStart: ms, marginHorizontal: mx }}
      name={iconName}
      as={<Feather />}
    />
  );
};
