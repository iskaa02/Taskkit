import { storage } from "@/db/db";
import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <HeaderButtons HeaderButtonComponent={FeatherHeader}>
      <OverflowMenu
        OverflowIcon={() => (
          <Feather name="more-vertical" size={23} color={p.tintColor} />
        )}
      >
        <HiddenItem title={t("edit")} onPress={p.onEditPress} />
        <HiddenItem
          title={t("delete")}
          onPress={() => {
            const shouldWarn = storage.getBoolean("warn-before-delete");
            if (shouldWarn) {
              Alert.alert(
                `${t("delete")} ${p.name} ${t("?")}`,
                t("delete-confirmation"),
                [
                  { text: t("cancel") },
                  {
                    text: t("delete"),
                    onPress: p.onDeletePress,
                  },
                ],
                { cancelable: true }
              );
            } else {
              p.onDeletePress();
            }
          }}
          destructive
        />
      </OverflowMenu>
    </HeaderButtons>
  );
}
