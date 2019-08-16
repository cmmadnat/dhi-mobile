import React from "react";
import { View } from "react-native";
import { Image, Text } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

const AboutScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Image
        source={require("../assets/logo.png")}
        resizeMode={"contain"}
        style={{ width: 200, flex: 1 }}
      />
      <Text style={{ flex: 3 }}>
        Banphaeo Hospital has provided advanced healthcare services for citizens
        for many years. To improve those services, the hospital needs to collect
        the health information of the citizens that it treats and send that
        information to the Ministry of Public Health to get support with medical
        equipment. However, it is often found that the information that is meant
        to be sent to the Ministry of Public Health is incomplete. This project
        is therefore focused on health data collection through a digital system.
        This system is particularly helpful in that it provides an electronic
        form builder to manage the forms used for surveys and view the results
        and their accompanying statistics via the web application. Those results
        will hopefully generate a complete version of the health information of
        the citizens that it treats, so that the hosptal can aquire the
        much-needed support.
      </Text>
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
