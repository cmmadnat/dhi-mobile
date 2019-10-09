import * as React from "react";
import { getHeaderInset } from "../components/header-inset";
import { WebView } from 'react-native-webview';
import { NavigationScreenProps, NavigationScreenProp, NavigationRoute, NavigationParams } from "react-navigation";
import superagent from 'superagent'
import { upload } from "../components/service/upload-service";
import { getToken } from "../components/service/login-service";
import { getCurrentPatient } from "../components/service/patient-service";
import { KeyboardAvoidingView } from "react-native";
export interface IAppShowSurveyScreenProps {
  navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>;
}

export default function AppShowSurveyScreen({ navigation }: IAppShowSurveyScreenProps) {
  const [rendered, setRendered] = React.useState(false)
  const webRef = React.useRef(null)
  const surveyId = navigation.getParam("surveyId", 0)
  const html =
    `
  <!DOCTYPE html>
<html>
    <head>
        <title>NPS survey with follow-up questions, jQuery Survey Library Example</title>
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">

        <script src="https://unpkg.com/jquery"></script>
        <script src="https://surveyjs.azureedge.net/1.1.14/survey.jquery.js"></script>
        <link href="https://surveyjs.azureedge.net/1.1.14/survey.css" type="text/css" rel="stylesheet"/>
        <link rel="stylesheet" href="./index.css">

    </head>
    <body>
        <div id="surveyElement"></div>
        <div id="surveyResult"></div>


    </body>
</html>
  `;
  React.useEffect(() => {
    if (!rendered) {
      setRendered(true)
      const url = `http://run.ict.mahidol.ac.th:443/getSurvey?surveyId=${surveyId}`
      superagent.get(url).then(data => {
        const json = JSON.stringify(data.body)
        const run = `
      var json = ${json}
      try{

      var survey = new Survey.Model(json);
      survey
            .onComplete
            .add(function (result) {
                window.ReactNativeWebView.postMessage(JSON.stringify(result.data));

            });
        $("#surveyElement").Survey({model: survey});
      }
      catch(e){
        alert(e.message);
      }
      true;
    `;
        setTimeout(() => {

          webRef.current.injectJavaScript(run)
        }, 2000);
      })
    }
  })
  return (
    <KeyboardAvoidingView style={{ flex: 1, display: 'flex' }} behavior="padding" enabled>
      <WebView
        ref={webRef}
        style={{ flex: 1 }}
        {...getHeaderInset()}
        scrollEnabled
        source={{ html: html }}
        onMessage={async event => {
          // alert(event.nativeEvent.data);
          const data = event.nativeEvent.data
          const token = await getToken()
          const patient = await getCurrentPatient()
          const patientId = patient.id
          upload(token, data, patientId, surveyId).then(() => {
            alert('บันทึกเรียบร้อย')
            navigation.goBack()
          }).catch(e => {
            alert('เกิดข้อผิดพลาด')
          })
        }}
      />
    </KeyboardAvoidingView>
  );
}
