import fetch from "@utils/http-fetch";

export const forumlist = (params) => {
  return fetch.post("/index.php?r=forum/forumlist", { ...params });
};
