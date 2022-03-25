/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import AddTaskScreen from "../screens/AddTask";
import CalendarScreen from "../screens/Calendar";
import Home from "../screens/Home";
import NotFoundScreen from "../screens/NotFoundScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying AddTasks on top of all other content.
 * https://reactnavigation.org/docs/AddTask
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
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
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",
            title: "Create New Task",
          }}
          name="AddTask"
          component={AddTaskScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          tabBarIcon: p => <HomeIcon {...p} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("AddTask")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={"#000"}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
          headerShadowVisible: false,
        })}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: p => <CalendarIcon {...p} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const CalendarIcon = ({
  focused,
  color,
}: {
  focused: boolean;
  color: string;
}) => {
  if (focused) {
    return (
      <Svg width={25} height={25} stroke="#000" viewBox="0 0 24 24">
        <Path
          d="M19 22a2 2 0 0 0 2-2V10H3v10a2 2 0 0 0 2 2h14Z"
          fill="#000"
          stroke="#000"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19 4H5a2 2 0 0 0-2 2v4h18V6a2 2 0 0 0-2-2ZM16 2v4M8 2v4"
          stroke="#000"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
  return (
    <Svg stroke={color} width="25" height="25" viewBox="0 0 24 24">
      <Path
        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 2V6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 2V6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 10H21"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
const HomeIcon = ({ focused, color }: { focused: boolean; color: string }) => {
  if (focused) {
    return (
      <Svg viewBox="0 0 21 21" width="25" height="25">
        <Path
          fill="black"
          d="M11.7099 1.28994C11.617 1.19621 11.5064 1.12182 11.3845 1.07105C11.2627 1.02028 11.132 0.994141 10.9999 0.994141C10.8679 0.994141 10.7372 1.02028 10.6154 1.07105C10.4935 1.12182 10.3829 1.19621 10.2899 1.28994L1.28994 10.2899C1.19621 10.3829 1.12182 10.4935 1.07105 10.6154C1.02028 10.7372 0.994141 10.8679 0.994141 10.9999C0.994141 11.132 1.02028 11.2627 1.07105 11.3845C1.12182 11.5064 1.19621 11.617 1.28994 11.7099C1.38338 11.8026 1.49419 11.8759 1.61603 11.9257C1.73787 11.9755 1.86833 12.0007 1.99994 11.9999H2.99994V18.9999C2.99994 19.5304 3.21065 20.0391 3.58573 20.4142C3.9608 20.7892 4.46951 20.9999 4.99994 20.9999H16.9999C17.5304 20.9999 18.0391 20.7892 18.4142 20.4142C18.7892 20.0391 18.9999 19.5304 18.9999 18.9999V11.9999H19.9999C20.2652 11.9999 20.5195 11.8946 20.707 11.707C20.8946 11.5195 20.9999 11.2652 20.9999 10.9999C21.0007 10.8683 20.9755 10.7379 20.9257 10.616C20.8759 10.4942 20.8026 10.3834 20.7099 10.2899L11.7099 1.28994Z"
        />
      </Svg>
    );
  }
  return (
    <Svg viewBox="0 0 21 21" width="25" height="25" fill={color}>
      <Path d="M11.7099 1.28994C11.617 1.19621 11.5064 1.12182 11.3845 1.07105C11.2627 1.02028 11.132 0.994141 10.9999 0.994141C10.8679 0.994141 10.7372 1.02028 10.6154 1.07105C10.4935 1.12182 10.3829 1.19621 10.2899 1.28994L1.28994 10.2899C1.19621 10.3829 1.12182 10.4935 1.07105 10.6154C1.02028 10.7372 0.994141 10.8679 0.994141 10.9999C0.994141 11.132 1.02028 11.2627 1.07105 11.3845C1.12182 11.5064 1.19621 11.617 1.28994 11.7099C1.38338 11.8026 1.49419 11.8759 1.61603 11.9257C1.73787 11.9755 1.86833 12.0007 1.99994 11.9999H2.99994V18.9999C2.99994 19.5304 3.21065 20.0391 3.58573 20.4142C3.9608 20.7892 4.46951 20.9999 4.99994 20.9999H16.9999C17.5304 20.9999 18.0391 20.7892 18.4142 20.4142C18.7892 20.0391 18.9999 19.5304 18.9999 18.9999V11.9999H19.9999C20.2652 11.9999 20.5195 11.8946 20.707 11.707C20.8946 11.5195 20.9999 11.2652 20.9999 10.9999C21.0007 10.8683 20.9755 10.7379 20.9257 10.616C20.8759 10.4942 20.8026 10.3834 20.7099 10.2899L11.7099 1.28994ZM4.99994 18.9999V9.40994L10.9999 3.40994L16.9999 9.40994V18.9999H4.99994Z" />
    </Svg>
  );
};
