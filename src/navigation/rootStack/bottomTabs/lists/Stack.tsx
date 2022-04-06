import { RootStackParamList } from "@/navigation/types";
import { listThemeType } from "@/theme/listThemes";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import TaskListView from "./ListScreen";
import ListTab from "./ListTab";
import TaskScreen from "./TaskScreen";

export type ListTabStack = {
  Root: undefined;
  List: {
    listID: string;
  };
  Task: {
    theme: listThemeType;
    label: string;
  };
};
export type ListScreenParamsList = NavigatorScreenParams<ListTabStack>;

export type ListStackScreenProps<Screen extends keyof ListTabStack> =
  CompositeScreenProps<
    NativeStackScreenProps<ListTabStack, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

const Stack = createNativeStackNavigator<ListTabStack>();
export default function Lists() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={ListTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
        }}
        name="Task"
        component={TaskScreen}
      />
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
        }}
        name="List"
        component={TaskListView}
      />
    </Stack.Navigator>
  );
}
