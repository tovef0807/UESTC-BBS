import fetch from "@utils/http-fetch";
import baseConfig from "../config/config";

export const forumlist = (params) => {
  return fetch.post(`${baseConfig.baseUrl}forum/forumlist`, { ...params });
};

export const topiclist = (params) => {
  return fetch.post(`${baseConfig.baseUrl}forum/topiclist`, { ...params });
};
