import * as React from "react";
import { WebView } from "react-native";
import { getHeaderInset } from "../components/header-inset";

export interface IAppShowSurveyScreenProps {}

export default function AppShowSurveyScreen(props: IAppShowSurveyScreenProps) {
  const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;

  return (
    <WebView
      style={{ flex: 1 }}
      {...getHeaderInset()}
      scalesPageToFit={false}
      injectedJavaScript={INJECTEDJAVASCRIPT}
      scrollEnabled
      source={{ uri: "http://run.ict.mahidol.ac.th:443/survey.html?id=97" }}
    />
  );
}
