import {
  RootStackParamList,
  RootTabParamList,
} from "@/navigation/RootStackTypes";
import { listThemeType } from "@/theme/listThemes";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
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
export type ListStackScreenProps<Screen extends keyof ListStackType> =
  NativeStackScreenProps<ListStackType, Screen>;

export type useNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ListStackType>,
  CompositeNavigationProp<
    NativeStackNavigationProp<RootTabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;
