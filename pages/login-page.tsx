import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Alert
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import LoadingComponent from "../components/loading-component";
import { Formik, yupToFormErrors } from "formik";
import * as yup from "yup";
import { isLogin, login } from "../components/service/login-service";
const schema = yup.object().shape({
  username: yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
  password: yup.string().required("กรุณากรอกรหัสผ่าน")
});

function LoginScreen({ navigation }) {
  const [loggingIn, setLoggingIn] = useState(true)
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    isLogin().then(loggedIn => {
      if (loggedIn) navigation.navigate("AppStack");
      setLoggingIn(false)
    }).catch((e) => {
      setLoggingIn(false)
    })
  });
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode={"contain"}
        style={styles.logo}
      />
      {
        !loggingIn && <View style={{ flex: 4, width: "100%", padding: 10 }}>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={schema}
            onSubmit={async (values, actions) => {
              setShowLoading(true);
              const result = await login(values.username, values.password);
              if (result) navigation.navigate("AppStack");
              else {
                setShowLoading(false);
                actions.setSubmitting(false);
                Alert.alert(
                  "เข้าสู่ระบบไม่สำเร็จ",
                  "โปรดตรวจสอบชื่อผู้ใช้งาน\nและรหัสผ่านอีกครั้ง"
                );
              }
            }}
            render={({
              handleSubmit,
              isSubmitting,
              errors,
              touched,
              handleChange,
              handleBlur,
              values
            }) => {
              return (
                <View>
                  <Input
                    label="Username"
                    leftIconContainerStyle={{ marginRight: 10 }}
                    containerStyle={styles.inputContainer}
                    placeholder="Username ..."
                    leftIcon={{
                      type: "font-awesome",
                      name: "user",
                      color: "#6D6F6F"
                    }}
                    onChangeText={handleChange("username")}
                    onBlur={() => handleBlur("username")}
                    value={values.username}
                    autoFocus
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.error}>{errors.username}</Text>
                  )}
                  <Input
                    label="Password"
                    leftIconContainerStyle={{ marginRight: 10 }}
                    containerStyle={styles.inputContainer}
                    placeholder="Password ..."
                    leftIcon={{
                      type: "font-awesome",
                      name: "unlock",
                      color: "#6D6F6F"
                    }}
                    onChangeText={handleChange("password")}
                    onBlur={() => handleBlur("password")}
                    value={values.password}
                    secureTextEntry={true}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  <Button
                    title="Login"
                    disabled={isSubmitting}
                    onPress={() => handleSubmit()}
                  />
                </View>
              );
            }}
          />
          <LoadingComponent show={showLoading} />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    flex: 1,
    width: 150,
    marginTop: 50
  },
  inputContainer: {
    marginBottom: 10
  },
  inputContainerInput: { paddingLeft: 10 },
  error: { marginBottom: 10, marginLeft: 30, fontSize: 15, color: "red" }
});

export default LoginScreen;
