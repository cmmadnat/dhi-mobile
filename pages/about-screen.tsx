import React from "react";
import { View as SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Image, Text } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode={"contain"}
        style={{ height: 100, marginTop: 50, alignSelf: "center" }}
      />
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <Text style={style.paragraph}>
          Banphaeo Hospital has provided advanced healthcare services for
          citizens for many years. To improve those services, the hospital needs
          to collect the health information of the citizens that it treats and
          send that information to the Ministry of Public Health to get support
          with medical equipment. However, it is often found that the
          information that is meant to be sent to the Ministry of Public Health
          is incomplete.
        </Text>
        <Text style={style.paragraph}>
          This project is therefore focused on health data collection through a
          digital system. This system is particularly helpful in that it
          provides an electronic form builder to manage the forms used for
          surveys and view the results and their accompanying statistics via the
          web application. Those results will hopefully generate a complete
          version of the health information of the citizens that it treats, so
          that the hosptal can aquire the much-needed support.
        </Text>
        <Text style={style.paragraph}>
          โรงพยาบาลบา้นแพว้เป็นองคก์รมหาชนที่ให้บริการรักษาสุขภาพประชาชนในชุมชนบา้น
          แพว้ในการยกระดบัการบริการใหม้ีประสิทธิภาพโรงพยาบาลบา้นแพว้จึงมีกระบวนการเก็บขอ้มูล
          สุขภาพจากผปู้ ่ วยและครอบครัว เพื่อใชใ้ นการวิเคราะห์ขอ้
          มูลเพื่อวิเคราะห์ขอ้ มูล ทาสถิติ และส่ง ขอ้ มูลน้ีเขา้ ระบบ ๔๓ แฟ้ม
          ขอ้ มูลของ ๔๓ แฟ้มจะถูกนาไปวิเคราะห์ต่อโดยกระทรวงสาธารณสุข
          และใชข้อ้มูลจากการวิเคราะห์นาไปวางแผนสุขภาพในระดบัประเทศต่อไปปัญหาสาคญัในการเก็บ
          ขอ้ มูลสุขภาพคือ ขอ้ มูลที่ถูกเก็บรวบรวมมีไม่ครบถว้ นซ่ึงทาใหก้
          ารวิเคราะห์ขอ้ มูลและการทาสถิติ คลาดเคลื่อน
          เพื่อลดปัญหาการเก็บข้อมูลไม่ครบถว้ น
          โครงงานน้ีจึงออกแบบและสร้างเว็บแอพ พลิเคชนั สาหรับสร้าง หรือแกไ้
          ขแบบสอบถามดว้ ยตนเอง รวมถึงการเก็บขอ้ มูลคาตอบจากการ
          สอบถามข้อมูลสุขภาพผ่านแอนดรอยด์แอพพลิเคชันสาหรับเจ้าหน้าที่ปฏิบัติการผู้ถูกทาง
          โรงพยาบาลมอบหมายใหไ้ปสอบถามผปู้่วยที่บา้นดว้ยตนเอง
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  paragraph: {
    marginBottom: 10,
    fontSize: 15
  }
});

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
