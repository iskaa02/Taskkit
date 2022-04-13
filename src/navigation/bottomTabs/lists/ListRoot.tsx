import { RootStackParamList } from "@/navigation/navPropsType";
import { listThemeType } from "@/theme/listThemes";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import ListScreen from "./listScreen/ListScreen";
import ListStackRoot from "./ListStackRoot";
import TaskScreen from "./task/TaskScreen";

export type ListTabStack = {
  Root: undefined;
  List: {
    listID: string;
  };
  Task: {
    theme: listThemeType;
    taskID: string;
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
        component={ListStackRoot}
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
        component={ListScreen}
      />
    </Stack.Navigator>
  );
}
