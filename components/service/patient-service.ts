import superagent from "superagent";
const URL = "http://run.ict.mahidol.ac.th";
export interface Patient {
  id: number;
  PatientCID: string;
  Name: string;
  DOB: string;
  Age?: any;
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
  return superagent.get(`${URL}/api/get`).then(data => data.body as Patient[]);
};

export const searchPatient = query => {
  return superagent
    .get(`${URL}/api/get/${query}`)
    .then(data => data.body as Patient[]);
};
