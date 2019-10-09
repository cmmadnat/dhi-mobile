import superagent from 'superagent'
import { baseUrl } from './constant'


const submitUrl = `${baseUrl}/result/upload`
export const upload = (token: string, json: string, patientId: number, surveyId: number) => {
  return superagent.post(submitUrl).send({
    json, patientId, surveyId
  }).set("Authorization", `Bearer ${token}`).type('form')
}