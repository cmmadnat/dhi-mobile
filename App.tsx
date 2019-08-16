import React from "react";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
  HeaderStyleInterpolator,
  TransitionConfig
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
//@ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { BlurView } from "expo-blur";

import AboutScreen from "./pages/about-screen";
import LoginScreen from "./pages/login-page";
import HomeScreen from "./pages/home-screen";
import PickSurveyScreen from "./pages/pick-survey-screen";
import { StatusBar, StatusBarIOS, Platform, View } from "react-native";

const surveyStack = createStackNavigator({
  pickPatient: { screen: HomeScreen },
  pickSurvey: { screen: PickSurveyScreen }
});
surveyStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: ({ tintColor }) => {
      return <Ionicons name={`md-home`} size={25} color={tintColor} />;
    },
    tabBarColor: "#ff66ff"
  };
};

const switchNavigator = createSwitchNavigator(
  {
    AuthStack: { screen: LoginScreen },
    AppStack: createMaterialBottomTabNavigator(
      {
        Home: surveyStack,
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
