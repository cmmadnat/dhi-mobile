import superagent from "superagent";
import { AsyncStorage } from "react-native";
import moment from "moment";
const URL = "http://run.ict.mahidol.ac.th";
export interface Patient {
  id: number;
  PatientCID: string;
  Name: string;
  DOB: string;
  Age?: number;
  gender: string;
  housenumber: string;
  moo: string;
  AMPHUR_ID: number;
  DISTRICT_ID: number;
  PROVINCE_ID: number;
  PROVINCE_CODE: string;
  PROVINCE_NAME: string;
  GEO_ID: number;
  DISTRICT_CODE: string;
  DISTRICT_NAME: string;
  AMPHUR_CODE: string;
  AMPHUR_NAME: string;
  POSTCODE: string;
  GEO_NAME: string;
}
export const getPatient = () => {
  return superagent
    .get(`${URL}/api/get`)
    .then(data => data.body as Patient[])
    .then(list =>
      list.map(it => {
        const Age = moment(it.DOB, "YYYY-MM-DD").diff(moment(), "years");
        return { ...it, Age: Math.abs(Age) };
      })
    );
};

export const searchPatient = query => {
  return superagent
    .get(`${URL}/api/get/${query}`)
    .then(data => data.body as Patient[]);
};

export const setCurrentPatient = (patient: Patient) => {
  return AsyncStorage.setItem("currentPatient", JSON.stringify(patient));
};
export const getCurrentPatient = () => {
  return AsyncStorage.getItem("currentPatient").then(
    data => JSON.parse(data) as Patient
  );
};
