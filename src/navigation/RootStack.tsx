import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import BottomTabNavigator from "./bottomTabs/BottomTabs";
import AddTaskScreen from "./addTask/AddTaskScreen";
import { RootStackParamList } from "./navPropsType";
import { useTranslation } from "react-i18next";
import Overview from "./overview/Overview";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen
          options={{
            presentation: "modal",
          }}
          name="Overview"
          component={Overview}
        />
      </Stack.Group>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          title: t("create-new-task"),
          presentation: "modal",
        }}
        name="AddTask"
        component={AddTaskScreen}
      />
    </Stack.Navigator>
  );
}
