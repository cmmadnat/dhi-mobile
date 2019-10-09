import superagent from "superagent";
import * as SecureStore from "expo-secure-store";
import { AsyncStorage } from "react-native";
import { baseUrl } from "./constant";

// export const baseUrl = "http://localhost:8080";
export const login = (username, password) => {
  const url = `${baseUrl}/oauth/token`;
  return superagent
    .post(url)
    .type("form")
    .send({ username, password, grant_type: 'password', client_id: 'my-client', client_secret: 'secret' })
    .then(data => {
      if (data.body.access_token) {
        storeLogin(username, password, data.body.access_token);
        return true;
      } else return false;
    }).catch(e => {
      return false
    })
};

export const isLogin = async () => {
  const username = await SecureStore.getItemAsync("username");
  const password = await SecureStore.getItemAsync("password");
  return await login(username ? username : 'noone', password ? password : 'noone')
};
export const logout = async () => {
  await SecureStore.deleteItemAsync("username");
  await SecureStore.deleteItemAsync("password");

  await AsyncStorage.multiRemove(['currentPatient'])
};

const storeLogin = async (username, password, token) => {
  SecureStore.setItemAsync("username", username);
  SecureStore.setItemAsync("password", password);
  SecureStore.setItemAsync("token", token);

};

export const getToken = () => {
  return SecureStore.getItemAsync("token")
}