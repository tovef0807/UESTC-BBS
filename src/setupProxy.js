const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/api", {
      target: "https://bbs.uestc.edu.cn/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
