import * as React from "react";
import { TextInput as TI } from "react-native";
import { Factory } from "native-base";
const T = Factory(TI);
type TextInputProps = React.ComponentProps<typeof T> & {
  variant?: "filled" | "flushed" | "outline";
};
export default function TextInput({ variant, ...p }: TextInputProps) {
  return <T borderRadius={5} fontSize="lg" p="10px" {...p} />;
}
