import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "./navPropsType";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: "/",
            },
          },
          Calendar: {
            screens: {
              Calendar: "/calendar",
            },
          },
        },
      },
      AddTask: "addtask",
    },
  },
};

export default linking;
