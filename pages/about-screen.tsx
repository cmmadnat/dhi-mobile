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
          โรงพยาบาลบ้านแพ้วเป็นองค์กรมหาชนที่ให้บริการรักษาสุขภาพประชาชนในชุมชนบ้าน
          แพ้วในการยกระดับการบริการให้มีประสิทธิภาพ
          โรงพยาบาลบ้านแพ้วจึงมีกระบวนการเก็บข้อมูล
          สุขภาพจากผู้ป่วยและครอบครัวเพื่อใช้ในการวิเคราะห์ข้อมูลเพื่อวิเคราะห์ข้อมูล
          ทางสถิติและส่ง ข้อมูลนี้เข้าระบบ ๔๓ แฟ้ม ข้อมูลของ ๔๓ แฟ้มจะถูกน
          าไปวิเคราะห์ต่อโดยกระทรวงสาธารณสุข และใช้ข้อมูลจากการวิเคราะห์น
          าไปวางแผนสุขภาพในระดับประเทศต่อไป ปัญหาสำคัญในการเก็บ ข้อมูลสุขภาพคือ
          ข้อมูลที่ถูกเก็บรวบรวมมีไม่ครบถ้วนซึ่งท
          าให้การวิเคราะห์ข้อมูลและการทางสถิติ คลาดเคลื่อน
          เพื่อลดปัญหาการเก็บข้อมูลไม่ครบถ้วน
          โครงงานนี้จึงออกแบบและสร้างเว็บแอพพลิเคชั่นสำหรับสร้าง
          หรือแก้ไขแบบสอบถามด้วยตนเอง รวมถึงการเก็บข้อมูลคำตอบจากการ
          สอบถามข้อมูลสุขภาพผ่านแอนดรอยด์แอพพลิเคชั่นสำหรับเจ้าหน้าที่ปฏิบัติการผู้ถูกทาง
          โรงพยาบาลมอบหมายให้ไปสอบถามผู้ป่วยที่บ้านด้วยตนเอง
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
