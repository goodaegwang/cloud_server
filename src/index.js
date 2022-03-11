const express = require("express");
const mysqlManager = require("./mysql/mysql");
const app = express();
const port = 1004;
const path = require("path");
const queryPathList = path.join(__dirname, "mybatis");

app.get("/", async (req, res) => {
  try {
    await Promise.all(mysqlManager.init(queryPathList));

    const query = {
      namespace: "devices",
      sqlId: "getDevicesAll",
      param: {},
    };

    const results = await mysqlManager.querySingle(query);

    res.send(results);
  } catch (err) {
    throw err.message;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
