const express = require("express");
const app = express();
const port = 1004;
const mysqlManager = require("./mysql/mysql");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/src/views"));

(async () => {
  try {
    await mysqlManager.init();
  } catch (err) {
    throw err;
  }
})();

app.use("/", require("./routes/index.routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
