import { I18nManager, Switch as RNswitch, SwitchProps } from "react-native";

export default function Switch({ style, ...p }: SwitchProps) {
  return (
    <RNswitch
      style={[
        style,
        I18nManager.isRTL
          ? {
              // transform: [{ rotate: "180deg" }],
              left: 10,
            }
          : {},
      ]}
      {...p}
    />
  );
}
