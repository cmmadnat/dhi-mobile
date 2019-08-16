import React from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AboutScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>I'm the third screen</Text>
    </View>
  );
};

AboutScreen.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: ({ tintColor }) => {
      return (
        <Ionicons name={`md-information-circle`} size={25} color={tintColor} />
      );
    },
    tabBarColor: "#6666ff"
  };
};
export default AboutScreen;
