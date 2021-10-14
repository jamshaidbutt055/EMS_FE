import axios from "axios";
import config from "../config.json";

export const axiosCall = (url, method, data) => {
  return axios({
    method: method,
    url: config.SERVER_URL + url,
    data: data,
  });
};
