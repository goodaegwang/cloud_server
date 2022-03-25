const express = require("express");
const app = express();
const port = 1004;
const indexService = require("./index.service");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/src/views"));

app.get("/", async function (req, res) {
  const devices = await indexService.getDevices();

  res.render("index", {
    devices,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
