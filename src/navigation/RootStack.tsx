import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import BottomTabNavigator from "./rootStack/bottomTabs/BottomTabs";
import AddTaskScreen from "./rootStack/addTask/AddTaskScreen";
import NotFoundScreen from "./rootStack/NotFoundScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            title: "Create New Task",
          }}
          name="AddTask"
          component={AddTaskScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
