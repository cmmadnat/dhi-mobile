import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import LoadingComponent from "../components/loading-component";

function LoginScreen({ navigation }) {
  const [showLoading, setShowLoading] = useState(false);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
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
            setShowLoading(true);
            navigation.navigate("AppStack");
            // setTimeout(() => {
            //   navigation.navigate("AppStack");
            // }, 4000);
          }}
        />
        <LoadingComponent show={showLoading} />
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
