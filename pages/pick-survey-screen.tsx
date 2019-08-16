import * as React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { getHeaderInset } from "../components/header-inset";

export interface IAppPickSurveyScreenProps {}

export default function AppPickSurveyScreen(props: IAppPickSurveyScreenProps) {
  return (
    <ScrollView style={{ flex: 1 }} {...getHeaderInset()}>
      <Text h1>Thitiwat Hemvimon</Text>
      <Text h2>Thitiwat Hemvimon</Text>
      <Text h3>Thitiwat Hemvimon</Text>
      <Text h4>Thitiwat Hemvimon</Text>
    </ScrollView>
  );
}
