import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import AboutScreen from "./about-screen";
import LoginScreen from "./pages/login-page";
import HomeScreen from "./pages/home-screen";

const switchNavigator = createSwitchNavigator(
  {
    AuthStack: { screen: LoginScreen },
    AppStack: createMaterialBottomTabNavigator(
      {
        Home: { screen: HomeScreen },
        About: { screen: AboutScreen }
      },
      {
        shifting: true,
        initialRouteName: "Home",
        activeColor: "#f0edf6",
        inactiveColor: "#3e2465",
        barStyle: { backgroundColor: "#694fad" }
      }
    )
  },
  {
    initialRouteName: "AuthStack"
  }
);

export default createAppContainer(switchNavigator);
