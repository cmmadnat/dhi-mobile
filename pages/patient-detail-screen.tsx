import * as React from "react";
import { View, ScrollView } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { getHeaderInset } from "../components/header-inset";
import AppBackground from "../components/background-component";

export interface IAppPickSurveyScreenProps {}

export default function AppPickSurveyScreen(props: IAppPickSurveyScreenProps) {
  return (
    <ScrollView style={{ flex: 1 }} {...getHeaderInset()}>
      <AppBackground name={"Thitiwat Hemvimon"} />
      <Card title="ข้อมูลทั่วไป">
        <ListItem title={"เลขบัตรประชาชน"} subtitle={"1100500333162"} />
        <ListItem title={"ชื่อ"} subtitle={"Thitiwat Hemvimon  "} />
        <ListItem title={"วันเกิด"} subtitle={"2 May 1989 (30 ปี)"} />
      </Card>
      <Card title="ข้อมูลทั่วไป">
        <ListItem title={"บ้านเลขที่"} subtitle={"1100500333162"} />
        <ListItem title={"หมู่"} subtitle={"Thitiwat Hemvimon  "} />
        <ListItem title={"ตำบล"} subtitle={"Thitiwat Hemvimon  "} />
        <ListItem title={"อำเภอ"} subtitle={"Thitiwat Hemvimon  "} />
        <ListItem title={"จังหวัด"} subtitle={"Thitiwat Hemvimon  "} />
        <ListItem title={"รหัสไปรษณีย์"} subtitle={"Thitiwat Hemvimon  "} />
      </Card>
    </ScrollView>
  );
}
