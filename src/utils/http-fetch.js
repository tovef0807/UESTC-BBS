import axios from "axios";
import qs from "qs";

import { Modal } from "antd";

const fetch = axios.create({
  baseURL: "api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});

fetch.interceptors.request.use(
  (config) => {
    // 给请求加上请求头
    // if(sessionStorage.token && sessionStorage.token !== 'undefined') {
    //   config.headers.Authorization = sessionStorage.token
    // }
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      if (
        typeof config.data !== "string" &&
        config.headers["Content-Type"] !== "multipart/form-data"
      ) {
        config.data.accessToken = "cca692bb7929a0a5130fda1762b78";
        config.data.accessSecret = "f78e5243fc736fc2ebd5131b4b768";
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  async (data) => {
    if (data.data.errcode !== "") {
      Modal.error({
        title: "This is an error message~",
        content: data.data.errcode,
      });
    } else {
      return Promise.resolve(data.data);
    }
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 500) {
        console.log("服务器错误，请联系管理员处理");
      }
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
);

export default fetch;
