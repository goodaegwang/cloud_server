const indexService = require("../services/index.service");

exports.index = async function (req, res, next) {
  const devices = await indexService.getDevices();

  res.render("index", {
    devices,
  });
};
