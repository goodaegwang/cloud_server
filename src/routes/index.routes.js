const express = require("express");
const router = express.Router();

const IndexController = require("../controller/index.controller");

router.get("/", IndexController.index);

module.exports = router;
