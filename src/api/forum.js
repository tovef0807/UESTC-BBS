import fetch from "@utils/http-fetch";
import baseConfig from "../config/config";

export const forumlist = (params) => {
  return fetch.post(`${baseConfig.baseUrl}forum/forumlist`, { ...params });
};

export const topiclist = (params) => {
  return fetch.post(`${baseConfig.baseUrl}forum/topiclist`, { ...params });
};

// 获取帖子的回复列表
export const postlist = (params) => {
  return fetch.post(`${baseConfig.baseUrl}forum/postlist`, { ...params });
};

// 发帖/回复
export const postNew = (content) => {
  return fetch.post(`${baseConfig.baseUrl}forum/postlist`, {
    act: "new",
    json: JSON.stringify(content),
  });
};

export const reply = (content) => {
  return fetch.post(`${baseConfig.baseUrl}forum/postlist`, {
    act: "reply",
    json: JSON.stringify(content),
  });
};
