import React from "react";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
//@ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { BlurView } from "expo-blur";

import AboutScreen from "./pages/about-screen";
import LoginScreen from "./pages/login-page";
import HomeScreen from "./pages/home-screen";
import PickSurveyScreen from "./pages/pick-survey-screen";

const surveyStack = createStackNavigator(
  {
    pickPatient: { screen: HomeScreen },
    pickSurvey: { screen: PickSurveyScreen }
  },
  {
    // initialRouteName: "pickSurvey",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "transparent"
      },
      headerTransparent: true,
      headerBackground: (
        <BlurView tint="default" style={{ flex: 1 }} intensity={100} />
      )
    }
  }
);
surveyStack.navigationOptions = () => {
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
    // initialRouteName: "AppStack"
  }
);

export default createAppContainer(switchNavigator);
