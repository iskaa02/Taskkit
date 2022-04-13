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

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Lists: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AddTask: { defaultList: string } | undefined;
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
