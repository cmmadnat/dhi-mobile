import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import AboutScreen from "./about-screen";
import LoginScreen from "./pages/login-page";
import HomeScreen from "./pages/home-screen";

const switchNavigator = createSwitchNavigator(
  {
    AuthStack: { screen: LoginScreen },
    AppStack: createBottomTabNavigator({
      Home: { screen: HomeScreen },
      About: { screen: AboutScreen }
    })
  },
  {
    initialRouteName: "AuthStack"
  }
);

export default createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
