import superagent from "superagent";
import * as SecureStore from "expo-secure-store";
import { AsyncStorage } from "react-native";

const baseUrl = "http://run.ict.mahidol.ac.th:443/";
export const login = (username, password) => {
  const url = `${baseUrl}authen`;
  return superagent
    .post(url)
    .type("form")
    .send({ uname: username, pwd: password })
    .then(data => {
      const newLocal = data.header;
      const cookie = newLocal["set-cookie"];
      if (data.text.search("ลงชื่อเข้าใช้") === -1) {
        // if (data.redirects[0] !== baseUrl) {
        storeLogin(username, password);
        AsyncStorage.setItem("cookie", cookie);
        return true;
      } else return false;
    });
};

export const isLogin = async () => {
  const username = await SecureStore.getItemAsync("username");
  return username !== null;
};
export const logout = async () => {
  await SecureStore.deleteItemAsync("username");
  await SecureStore.deleteItemAsync("password");
  await AsyncStorage.clear();
};

const storeLogin = async (username, password) => {
  SecureStore.setItemAsync("username", username);
  SecureStore.setItemAsync("password", password);
};
