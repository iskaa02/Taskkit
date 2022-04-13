import { CalendarIcon, HomeIcon, ListIcon } from "@/assets/TabBarIcons";
import { RootTabParamList } from "@/navigation/navPropsType";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CalendarScreen from "./calendar/Calendar";
import HomeScreen from "./home/Home";
import ListScreen from "./lists/ListRoot";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        headerShadowVisible: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: p => <HomeIcon {...p} />,
          headerShown: true,
        }}
      />
      <BottomTab.Screen
        name="Lists"
        component={ListScreen}
        options={{
          tabBarIcon: p => <ListIcon {...p} />,
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: p => <CalendarIcon {...p} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
