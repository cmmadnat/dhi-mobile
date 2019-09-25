import superagent from "superagent";
import * as SecureStore from "expo-secure-store";
import { AsyncStorage } from "react-native";

const baseUrl = "http://run.ict.mahidol.ac.th:443/";
export const login = (username, password) => {
  const url = `${baseUrl}proxy/oauth/token`;
  return superagent
    .post(url)
    .type("form")
    .send({ username, password, grant_type: 'client_credentials', client_id: 'my-client', client_secret: 'secret' })
    .then(data => {
      // const newLocal = data.header;
      // const cookie = newLocal["set-cookie"];
      if (data.body.access_token) {
        // if (data.redirects[0] !== baseUrl) {
        storeLogin(username, password);
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

  await AsyncStorage.multiRemove(['currentPatient'])
};

const storeLogin = async (username, password) => {
  SecureStore.setItemAsync("username", username);
  SecureStore.setItemAsync("password", password);
};
