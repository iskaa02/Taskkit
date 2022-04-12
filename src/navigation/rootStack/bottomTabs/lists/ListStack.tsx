import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ListRoot from "./ListRoot";
import ListScreen from "./ListScreen";
import { ListStackType } from "./ListStackType";
import TaskScreen from "./TaskScreen";

const Stack = createNativeStackNavigator<ListStackType>();
const List = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Root"
        component={ListRoot}
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
};

export default List;
