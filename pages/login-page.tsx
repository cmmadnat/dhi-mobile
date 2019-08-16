import React from "react";
import LottieView from "lottie-react-native";
import { View, Image, Button, StyleSheet } from "react-native";
import { Input } from "react-native-elements";

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

export default LoginScreen;
