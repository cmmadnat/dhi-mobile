// import { upload } from "../components/service/upload-service"
// import superagent from 'superagent'
// import { baseUrl } from "../components/service/constant";

// test('upload result', async () => {
//   const url = `${baseUrl}/oauth/token`;
//   const username = 'Banphaeo.Staff'
//   const password = 'BanPhaeo'
//   return superagent
//     .post(url)
//     .type("form")
//     .send({ username, password, grant_type: 'password', client_id: 'my-client', client_secret: 'secret' })
//     .then(async data => {
//       if (data.body.access_token) {
//         const result = await upload(data.body.access_token, "{}", 123, 13)
//         expect(result.text).toEqual('success')

//       }
//     })
// })