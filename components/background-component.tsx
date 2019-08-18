import React from "react";
import { Card, Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

export interface IAppBackgroundProps {
  name: string;
  pickSurvey: () => void;
}

export default function AppBackground({
  name,
  pickSurvey
}: IAppBackgroundProps) {
  const randomNumber = Math.round(Math.random() * 10) % 3;
  const images = [
    require("../assets/background/1.jpg"),
    require("../assets/background/2.jpg"),
    require("../assets/background/3.jpg")
  ];
  return (
    <Card title={name} image={images[randomNumber]}>
      <Button
        backgroundColor="#03A9F4"
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0
        }}
        title="เลือกแบบสอบถาม"
        onPress={pickSurvey}
      />
    </Card>
  );
}
