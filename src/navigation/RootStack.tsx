import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import BottomTabNavigator from "./bottomTabs/BottomTabs";
import AddTaskScreen from "./addTask/AddTaskScreen";
import { RootStackParamList } from "./navPropsType";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            title: t("create-new-task"),
            presentation: "modal",
          }}
          name="AddTask"
          component={AddTaskScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
