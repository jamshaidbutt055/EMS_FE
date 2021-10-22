import axios from "axios";
import config from "../config.json";

export const axiosCall = (url, method, data, authHeader = true) => {
  let options = {
    method: method,
    url: config.SERVER_URL + url,
    data: data,
  };
  if (authHeader) {
    try {
      const { token } = JSON.parse(localStorage.getItem("loggedUser"));
      options["headers"] = { Authorization: `Bearer ${token}` };
    } catch (err) {
      console.log(err);
    }
  }
  return axios(options);
};
