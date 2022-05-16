import SelectSheet from "@/components/Select";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Icon, Text, useColorModeValue, useTheme } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { useObservable } from "rxjs-hooks";
type ChangeListProps = {
  task: Task;
  afterChange?: () => void;
};
export default function ChangeList({ task, afterChange }: ChangeListProps) {
  const lists = useObservable(
    () => database.get<List>(Tables.List).query().observe(),
    []
  );
  const borderColor = useColorModeValue("#eaeaea", "#787878");
  const ref = React.useRef<BottomSheetModal>(null);
  const { surface } = useTheme().colors;
  const { t } = useTranslation();

  return (
    <>
      <Text bold color="em.1" mb="1" fontSize="2xl">
        {t("list", { count: 1, postProcess: "interval" })}
      </Text>

      <TouchableOpacity
        onPress={() => {
          ref.current?.present();
        }}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderWidth: 1,
          flexDirection: "row",
          backgroundColor: surface,
          alignSelf: "flex-start",
          borderRadius: 5,
          alignItems: "center",
          borderColor,
        }}
        activeOpacity={0.6}
      >
        <Text fontSize="md" style={{ marginEnd: 20 }}>
          {lists.find(i => i.id == task.list.id)?.name}
        </Text>
        <Icon as={Feather} name="chevron-down" size="20px" />
      </TouchableOpacity>
      <SelectSheet
        value={task.list.id ?? ""}
        items={lists.map(i => ({ label: i.name, value: i.id }))}
        onChange={newListID => {
          task.changeList(newListID);
          afterChange && afterChange();
        }}
        ref={ref}
      />
    </>
  );
}
