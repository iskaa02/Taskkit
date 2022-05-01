import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Icon, Pressable, Text, useColorModeValue } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";

type BottomButtonProps = {
    onPress: () => void;
    iconName?: string;
    colorLight?: string;
    colorDark?: string;
    label: string;
    iconText?: string;
    index?: number;
};
export const BottomButton = ({
    onPress, iconName, label, colorLight, colorDark, iconText, index,
}: BottomButtonProps) => {
    const iconColor = useColorModeValue(colorLight, colorDark);
    const textColor = useColorModeValue(colorLight, colorDark);
    const { width } = useWindowDimensions();
    return (
        <MotiView
            style={{
                marginHorizontal: (width - 55 * 4) / 8,
                justifyContent: "center",
                alignItems: "center",
            }}
            from={{ opacity: 0, bottom: 20 }}
            animate={{ opacity: 1, bottom: 0 }}
            delay={index && index * 100}
        >
            <Pressable
                w="55px"
                borderWidth={1}
                borderColor="em.5"
                h="55px"
                bg="surface"
                borderRadius={30}
                alignItems="center"
                justifyContent="center"
                onPress={onPress}
            >
                {iconText ? (
                    <Text
                        fontSize="2xl"
                        textAlign="center"
                        color={textColor}
                        adjustsFontSizeToFit
                    >
                        {iconText}
                    </Text>
                ) : (
                    <Icon color={iconColor} size={23} name={iconName} as={Feather} />
                )}
            </Pressable>
            <Text color="em.2">{label}</Text>
        </MotiView>
    );
};
