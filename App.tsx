import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { Button } from "react-native-elements";
import AboutScreen from "./about-screen";
import LoginScreen from "./pages/login-page";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>I'm a second screen</Text>
      <Button
        title="Click to go to third page"
        onPress={() => {
          navigation.navigate("About");
        }}
      />
    </View>
  );
};
const switchNavigator = createSwitchNavigator(
  {
    AuthStack: { screen: LoginScreen },
    AppStack: createStackNavigator({
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
