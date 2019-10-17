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
import AppPatientScreen from "./pages/patient-detail-screen";
import PickSurveyScreen from "./pages/pick-survey-screen";
import PickSurveyScreen2 from "./pages/pick-survey-screen2";
import ShowSurvey from "./pages/show-survey-screen";
import PickLocationScreen from './pages/pick-location-screen'
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "ReactNative.NativeModules.LottieAnimationView.getConstants"
]);

const surveyStack = createStackNavigator(
  {
    pickPatient: { screen: HomeScreen },
    patientDetail: { screen: AppPatientScreen },
    pickSurvey: { screen: PickSurveyScreen },
    pickSurvey2: { screen: PickSurveyScreen2 },
    showSurvey: { screen: ShowSurvey },
    pickLocation: { screen: PickLocationScreen }
  },
  {
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
    tabBarColor: "#324376"
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
        inactiveColor: "#212121",
        barStyle: { backgroundColor: "#694fad" }
      }
    )
  },
  {
    initialRouteName: "AuthStack"
  }
);

export default createAppContainer(switchNavigator);
