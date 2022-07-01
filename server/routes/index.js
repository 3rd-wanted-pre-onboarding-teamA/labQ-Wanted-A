const express = require("express");
const result1 = require("./result1");
const router = express.Router();

router.use("/result1", result1);

module.exports = router;
