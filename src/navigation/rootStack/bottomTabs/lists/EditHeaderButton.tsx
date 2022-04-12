import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { Alert } from "react-native";
import {
  HeaderButton,
  HeaderButtons,
  HiddenItem,
  OverflowMenu,
} from "react-navigation-header-buttons";

const FeatherHeader = (props: any) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton IconComponent={Feather} iconSize={23} {...props} />
);
type EditHeaderButtonProps = {
  onEditPress: () => void;
  onDeletePress: () => void;
  tintColor: string;
  name: string;
};
export default function EditHeaderButton(p: EditHeaderButtonProps) {
  return (
    <HeaderButtons HeaderButtonComponent={FeatherHeader}>
      <OverflowMenu
        OverflowIcon={() => (
          <Feather name="more-vertical" size={23} color={p.tintColor} />
        )}
      >
        <HiddenItem title="Edit" onPress={p.onEditPress} />
        <HiddenItem
          title="Delete"
          onPress={() => {
            Alert.alert(
              `Delete ${p.name}`,
              "Are your sure this",
              [
                { text: "Cancel" },
                {
                  text: "Delete",
                  onPress: p.onDeletePress,
                },
              ],
              { cancelable: true }
            );
          }}
          destructive
        />
      </OverflowMenu>
    </HeaderButtons>
  );
}
