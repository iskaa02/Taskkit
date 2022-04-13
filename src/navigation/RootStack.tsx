import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import BottomTabNavigator from "./bottomTabs/BottomTabs";
import AddTaskScreen from "./addTask/AddTaskScreen";
import { RootStackParamList } from "./navPropsType";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
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
            title: "Create New Task",
            presentation: "modal",
          }}
          name="AddTask"
          component={AddTaskScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
