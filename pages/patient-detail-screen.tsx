import React, { useState, useEffect } from "react";

import { ScrollView } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { getHeaderInset } from "../components/header-inset";
import AppBackground from "../components/background-component";
import {
  Patient,
  getCurrentPatient
} from "../components/service/patient-service";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

export interface PickSurveyScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function PatientDetailScreen({ navigation }) {
  const LOADING = "loading...";
  const [patient, setPatient] = useState({ Name: LOADING } as Patient);
  useEffect(() => {
    if (patient.Name === LOADING) getCurrentPatient().then(p => setPatient(p));
  });
  return (
    <ScrollView style={{ flex: 1 }} {...getHeaderInset()}>
      <AppBackground
        name={patient.Name}
        pickSurvey={() => {
          navigation.navigate("pickSurvey");
        }}
      />
      <Card title="ข้อมูลทั่วไป">
        <ListItem title={"เลขบัตรประชาชน"} subtitle={patient.PatientCID} />
        <ListItem title={"ชื่อ"} subtitle={patient.Name} />
        <ListItem
          title={"วันเกิด"}
          subtitle={patient.DOB + " (" + patient.Age + " ปี)"}
        />
      </Card>
      <Card title="ข้อมูลทั่วไป">
        <ListItem title={"บ้านเลขที่"} subtitle={patient.housenumber} />
        <ListItem title={"หมู่"} subtitle={patient.moo} />
        <ListItem title={"ตำบล"} subtitle={patient.DISTRICT_NAME} />
        <ListItem title={"อำเภอ"} subtitle={patient.AMPHUR_NAME} />
        <ListItem title={"จังหวัด"} subtitle={patient.PROVINCE_NAME} />
        <ListItem title={"รหัสไปรษณีย์"} subtitle={patient.POSTCODE} />
      </Card>
    </ScrollView>
  );
}
PatientDetailScreen.navigationOptions = {
  title: "รายละเอียดคนไข้"
};

export default PatientDetailScreen;
