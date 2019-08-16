import React from "react";
import { StyleSheet } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";

export interface IAppBackgroundProps {
  name: string;
}

export default function AppBackground() {
  const randomNumber = Math.round(Math.random() * 10) % 3;
  const images = [
    require("../assets/background/1.jpg"),
    require("../assets/background/2.jpg"),
    require("../assets/background/3.jpg")
  ];
  return (
    <Card title="HELLO WORLD" image={images[randomNumber]}>
      <Text style={{ marginBottom: 10 }}>
        The idea with React Native Elements is more about component structure
        than actual design.
      </Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        backgroundColor="#03A9F4"
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0
        }}
        title="VIEW NOW"
      />
    </Card>
  );
}
