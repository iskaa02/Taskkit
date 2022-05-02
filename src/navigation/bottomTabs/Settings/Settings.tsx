import SelectSheet from "@/components/Select";
import StatusBar from "@/components/StatusBar";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import { storage } from "@/db/storage";
import useColorMode from "@/hooks/useColorScheme";
import i18n, { changeLanguage } from "@/i18n/i18n";
import { languages } from "@/i18n/langs";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Box, ScrollView, Text } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMMKVBoolean, useMMKVString } from "react-native-mmkv";
import { useObservable } from "rxjs-hooks";
import {
  SettingsContainer,
  SettingsHeading,
  SettingsLabel,
  SettingsWithSwitch,
} from "./SettingsComponents";
export default function Profile() {
  const { t } = useTranslation();
  return (
    <ScrollView pt="10px" _dark={{ bg: "background" }} bg="surface">
      <StatusBar />
      <SettingsHeading>{t("preferences")}</SettingsHeading>
      <Box pb="2">
        <ThemeSwitch />
        <LanguageSettings />
      </Box>
      <SettingsHeading>
        {t("task", { count: 2, postProcess: "interval" })}
      </SettingsHeading>
      <TaskSettings />
    </ScrollView>
  );
}

const ThemeSwitch = () => {
  const { colorMode, setColorMode, isSystemDefault } = useColorMode();

  const currentColorMode = React.useMemo(() => {
    if (isSystemDefault) return "system-default";
    return colorMode;
  }, [colorMode, isSystemDefault]);
  const { t } = useTranslation();
  const sheetRef = React.useRef<BottomSheetModal>(null);
  return (
    <SettingsContainer
      iconName="moon"
      onPress={() => {
        sheetRef.current?.present();
      }}
      withEndArrow
    >
      <SettingsLabel>{t("color-mode")}</SettingsLabel>
      <Box flexDirection="row">
        <Text fontSize="md" color="em.3">
          {t(currentColorMode)}
        </Text>
        <SelectSheet
          ref={sheetRef}
          value={currentColorMode}
          items={[
            { value: "light", label: t("light") },
            { value: "dark", label: t("dark") },
            { value: "system-default", label: t("system-default") },
          ]}
          onChange={v => {
            if (v != "dark" && v !== "light" && v !== "system-default") return;
            setColorMode(v);
          }}
        />
      </Box>
    </SettingsContainer>
  );
};

const LanguageSettings = () => {
  // @ts-ignore
  const { t } = useTranslation();
  const langNames = React.useMemo(() => {
    return Object.keys(languages).map(code => {
      return { name: languages[code].name, code };
    });
  }, []);
  const [selectedLang, setSelectedLang] = React.useState<{
    name: string;
    code: string;
  }>(() => {
    let code = i18n.language[0] + i18n.language[1];
    return { name: languages[code].name, code };
  });
  const sheetRef = React.useRef<BottomSheetModal>(null);
  return (
    <SettingsContainer
      iconName="globe"
      withEndArrow
      onPress={() => {
        sheetRef.current?.present();
      }}
    >
      <SettingsLabel>{t("language")}</SettingsLabel>
      <Box flexDirection="row">
        <Text fontSize="md" color="em.3">
          {!selectedLang ? null : selectedLang.name}
        </Text>
        <SelectSheet
          ref={sheetRef}
          value={selectedLang.name}
          items={langNames.map(i => i.name)}
          onChange={v => {
            const newLang = langNames.find(i => i.name === v);
            if (newLang) {
              setSelectedLang(newLang);
              console.log(newLang.code);
              changeLanguage(newLang.code);
            }
          }}
        />
      </Box>
    </SettingsContainer>
  );
};

const TaskSettings = () => {
  const { t } = useTranslation();
  const [warnBeforeDelete, setWarnBeforeDelete] = useMMKVBoolean(
    "warn-before-delete",
    storage
  );
  const [sendNotification, setSendNotification] = useMMKVBoolean(
    "send-notification-even-when-completed",
    storage
  );
  const [defaultList, setDefaultList] = useMMKVString("default-list", storage);
  const lists = useObservable(
    () => database.get<List>(Tables.List).query().observe(),
    []
  );
  const sheetRef = React.useRef<BottomSheetModal>(null);
  return (
    <Box>
      <SettingsWithSwitch
        label={t("warn-before-delete")}
        value={warnBeforeDelete}
        onValueChange={i => {
          setWarnBeforeDelete(i);
        }}
      />
      <SettingsWithSwitch
        label={t("always-notify")}
        description={t("always-notify-description")}
        onValueChange={value => setSendNotification(value)}
        value={sendNotification}
      />
      <SettingsContainer
        withEndArrow
        onPress={() => {
          sheetRef.current?.present();
        }}
      >
        <SettingsLabel>Default list</SettingsLabel>
        <Text fontSize="md" color="em.3">
          {lists.find(i => i.id === defaultList)?.name}
        </Text>
        <SelectSheet
          ref={sheetRef}
          items={lists.map(i => ({ label: i.name, value: i.id }))}
          value={defaultList ?? ""}
          onChange={i => {
            setDefaultList(i);
          }}
        />
      </SettingsContainer>
    </Box>
  );
};
