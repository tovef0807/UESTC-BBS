import fetch from "@utils/http-fetch";
import baseConfig from "../config/config";

export const userLogin = (params) => {
  return fetch.post(`${baseConfig.baseUrl}user/login`, {
    type: "login",
    ...params,
  });
};

export const userLogout = (params) => {
  return fetch.post(`${baseConfig.baseUrl}user/login`, {
    type: "logout",
    ...params,
  });
};
