import Fab from "@/components/Fab";
import StatusBar from "@/components/StatusBar";
import TaskCard from "@/components/TaskCard";
import { database } from "@/db/db";
import List from "@/db/models/List";
import { Columns, Tables } from "@/db/models/schema";
import Task from "@/db/models/Task";
import withDB from "@/db/models/withDB";
import useAccent from "@/hooks/useAccent";
import {
  ListStackScreenProps,
  useNavigationProps,
} from "@/navigation/navPropsType";
import { listThemeType } from "@/theme/listThemes";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Q } from "@nozbe/watermelondb";
import Database from "@nozbe/watermelondb/Database";
import { useNavigation } from "@react-navigation/native";
import { Box, Icon, Text, useColorModeValue, useTheme } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { useObservable } from "rxjs-hooks";
import EditHeaderButton from "./EditHeaderButton";
import { EditListSheet } from "./EditListSheet";

type ListScreenProps = ListStackScreenProps<"List"> & {
  list: List;
  listID: string;
  database: Database;
};
const RawListScreen = ({ navigation, list }: ListScreenProps) => {
  const tintColor = useColorModeValue("#000", "#fff");
  const { background } = useTheme().colors;
  const tasks = useObservable(() => list.tasks.observe(), [], [list]);
  const count = useObservable(() => list.tasks.observeCount(), 0);
  const accent = useAccent(list.theme);
  const { t } = useTranslation();
  const secondary = useAccent(list.theme, { flip: true });
  const sheetRef = React.useRef<BottomSheetModalMethods>(null);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: background,
      },
      headerTintColor: tintColor,
      headerRight: () => (
        <EditHeaderButton
          onClearFinishTasks={() => {
            list.tasks
              .extend(Q.where(Columns.task.isCompleted, Q.eq(true)))
              .markAllAsDeleted();
          }}
          onEditPress={() => {
            sheetRef.current?.present();
          }}
          onDeletePress={() => {
            list.markAsDeleted();
            navigation.goBack();
          }}
          name={list.name}
          tintColor={tintColor}
        />
      ),
    });
  }, [background]);
  return (
    <>
      <TasksFlatList
        tasks={tasks}
        theme={list.theme}
        ListHeaderComponent={() => {
          return (
            <>
              <Box bg="background" flex={1}>
                <Box px="20px">
                  <StatusBar />
                  <Text color={accent} bold textAlign="left" fontSize="3xl">
                    {list.name}
                  </Text>
                  {!count ? null : (
                    <Text color="em.3">
                      {t("task-left-count", { count, postProcess: "interval" })}
                    </Text>
                  )}
                </Box>

                <Box my={3} />
              </Box>
            </>
          );
        }}
      />
      <Fab
        style={{ backgroundColor: secondary }}
        onPress={() => {
          navigation.push("AddTask", { defaultList: list.id });
        }}
      >
        <Icon
          name="plus"
          size="30px"
          as={Feather}
          color={list.theme.secondary ? "em.1" : "em.10"}
        />
      </Fab>
      <EditListSheet ref={sheetRef} list={list} />
    </>
  );
};

const TasksFlatList = ({
  tasks,
  theme,
  ListHeaderComponent,
}: {
  tasks: Task[];
  theme: listThemeType;
  ListHeaderComponent: React.ComponentType<any>;
}) => {
  const navigation = useNavigation<useNavigationProps>();
  return (
    <FlatList
      data={tasks}
      extraData={theme}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      renderItem={({ item: v, index: i }) => (
        <Box mt="1" px="20px">
          <TaskCard
            key={v.id}
            task={v}
            onPress={() =>
              navigation.push("Task", {
                theme: theme,
                taskID: v.id,
              })
            }
          />
        </Box>
      )}
    />
  );
};

const Screen = withDB<ListScreenProps, { list: List }>(
  RawListScreen,
  ["listID", "database"],
  ({ listID, database }) => ({
    list: database.get<List>(Tables.List).findAndObserve(listID),
  })
);

export default function TaskListScreen(p: ListStackScreenProps<"List">) {
  return <Screen database={database} listID={p.route.params.listID} {...p} />;
}
