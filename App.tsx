import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { Button, Input } from "react-native-elements";
import { func } from "prop-types";
import AboutScreen from "./about-screen";

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/logo.png")}
        resizeMode={"center"}
        style={styles.logo}
      />
      <View style={{ flex: 4, width: "100%", padding: 10 }}>
        <Input
          label="Username"
          leftIconContainerStyle={{ marginRight: 10 }}
          containerStyle={styles.inputContainer}
          placeholder="Username ..."
          leftIcon={{ type: "font-awesome", name: "user", color: "#6D6F6F" }}
          autoFocus
        />

        <Input
          label="Password"
          leftIconContainerStyle={{ marginRight: 10 }}
          containerStyle={styles.inputContainer}
          placeholder="Password ..."
          leftIcon={{ type: "font-awesome", name: "unlock", color: "#6D6F6F" }}
          secureTextEntry={true}
        />

        <Button
          title="Login"
          onPress={() => {
            // navigation.navigate("AppStack");
          }}
        />
      </View>
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
  },
  logo: {
    flex: 1,
    width: 150,
    marginTop: 50
  },
  inputContainer: {
    marginBottom: 10
  },
  inputContainerInput: { paddingLeft: 10 }
});
