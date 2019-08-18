import * as React from "react";
import { WebView } from "react-native";

export interface IAppShowSurveyScreenProps {}

export default function AppShowSurveyScreen(props: IAppShowSurveyScreenProps) {
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: "http://run.ict.mahidol.ac.th:443/survey.html?id=97" }}
    />
  );
}
