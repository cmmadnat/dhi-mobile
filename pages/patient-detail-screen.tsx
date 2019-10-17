import React, { useState, useEffect } from "react";

import { ScrollView } from "react-native";
import { Card, ListItem, Text } from "react-native-elements";
import PatientLocation, { LatLng } from '../components/patient-location'
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
import superagent from 'superagent'
import PhotoPick from "../components/photo-pick";
import { baseUrl } from "../components/service/constant";
import { getToken } from "../components/service/login-service";

export interface PickSurveyScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const getLocation = (patientId: number, token: string) => {
  return superagent.get(`${baseUrl}/location/${patientId}`).set('Authorization', 'Bearer ' + token)
}

function PatientDetailScreen({ navigation }) {
  const LOADING = "loading...";
  const [patient, setPatient] = useState({ Name: LOADING } as Patient);
  const [location, setLocation] = useState(null)
  useEffect(() => {
    if (patient.Name === LOADING) getCurrentPatient().then(p => setPatient(p));
  });
  useEffect(() => {
    const getLocationAsync = async () => {

      if (patient.Name !== LOADING) {
        const token = await getToken()
        const l = (await getLocation(patient.id, token)).body as LatLng
        console.log(l)
        if (l) {
          setLocation({ lat: l.lat, lng: l.lng })
        }
      }

    }
    getLocationAsync()
  })
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
      <Card title="ที่อยู่">
        <ListItem title={"บ้านเลขที่"} subtitle={patient.housenumber} />
        <ListItem title={"หมู่"} subtitle={patient.moo} />
        <ListItem title={"ตำบล"} subtitle={patient.DISTRICT_NAME} />
        <ListItem title={"อำเภอ"} subtitle={patient.AMPHUR_NAME} />
        <ListItem title={"จังหวัด"} subtitle={patient.PROVINCE_NAME} />
        <ListItem title={"รหัสไปรษณีย์"} subtitle={patient.POSTCODE} />
        <PatientLocation location={null} navigation={navigation}></PatientLocation>
      </Card>
      <Card>
        <Text>รูปภาพ</Text>
        <PhotoPick patientId={patient.id}></PhotoPick>
      </Card>
    </ScrollView>
  );
}
PatientDetailScreen.navigationOptions = {
  title: "รายละเอียดคนไข้"
};

export default PatientDetailScreen;
