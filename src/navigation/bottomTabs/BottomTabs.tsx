import {
  CalendarIcon,
  HomeIcon,
  ListIcon,
  ProfileIcon,
} from "@/assets/TabBarIcons";
import { RootTabParamList } from "@/navigation/navPropsType";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTranslation } from "react-i18next";
import CalendarScreen from "./calendar/Calendar";
import HomeScreen from "./home/Home";
import ListScreen from "./lists/ListRoot";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const { t } = useTranslation();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: p => <HomeIcon {...p} />,
          headerShown: true,
          title: t("all-tasks"),
        }}
      />
      <BottomTab.Screen
        name="Lists"
        component={ListScreen}
        options={{
          tabBarIcon: p => <ListIcon {...p} />,
          lazy: false,
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: p => <CalendarIcon {...p} />,
          lazy: false,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={HomeScreen}
        options={{
          tabBarIcon: p => <ProfileIcon {...p} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
