const Koa = require("koa");
const koaStatic = require("koa-static");
const path = require("path");
const { historyApiFallback } = require("koa2-connect-history-api-fallback");

const app = new Koa();

app.use(
  historyApiFallback({
    index: "/index.html",
  })
);
app.use(
  koaStatic(path.join(__dirname, "../static"), {
    maxage: 1000 * 60 * 60 * 24 * 365,
    setHeaders: (res, file) => {
      const reg = /index.html/;
      console.log(file);
      if (file.match(reg)) {
        res.setHeader("Cache-Control", "no-store;");
      }
    },
  })
);

app.listen(9002, () => {
  console.log("server is runing at ", 9002);
});
