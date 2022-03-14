const express = require("express");
const app = express();
const port = 1004;
const mysqlManager = require("./mysql/mysql");
const path = require("path");
const queryPathList = path.join(__dirname, "mybatis");

app.get("/", async (req, res) => {
  try {
    const query = {
      namespace: "devices",
      sqlId: "getDevicesAll",
      param: {},
    };

    const results = await mysqlManager.querySingle(query, queryPathList);

    console.log(results);
  } catch (err) {
    throw err.message;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
