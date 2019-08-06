import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { func } from "prop-types";
import AboutScreen from "./about-screen";

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>I could be a login screen</Text>
      <Button
        title="Click to go to next page"
        onPress={() => {
          navigation.navigate("AppStack");
        }}
      />
    </View>
  );
}
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
    AuthStack: createStackNavigator({ Login: { screen: LoginScreen } }),
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
