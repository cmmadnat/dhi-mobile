import superagent from "superagent";
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
      if (data.redirects[0] !== baseUrl) return cookie;
      else return "";
    });
};
