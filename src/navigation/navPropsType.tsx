import { listThemeType } from "@/theme/listThemes";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Lists: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AddTask: { defaultList?: string; date?: number } | undefined;
  Overview: undefined;
};

export type ListStackType = {
  Root: undefined;
  List: {
    listID: string;
    fromScreen: string;
  };
  Task: {
    theme: listThemeType;
    taskID: string;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList, "Root">,
    BottomTabScreenProps<RootTabParamList, Screen>
  >;

export type ListStackScreenProps<Screen extends keyof ListStackType> = Omit<
  CompositeScreenProps<
    RootTabScreenProps<"Lists">,
    NativeStackScreenProps<ListStackType, Screen>
  >,
  "route"
> & {
  route: NativeStackScreenProps<ListStackType, Screen>["route"];
};

export type useNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  CompositeNavigationProp<
    NativeStackNavigationProp<RootTabParamList>,
    NativeStackNavigationProp<ListStackType>
  >
>;
