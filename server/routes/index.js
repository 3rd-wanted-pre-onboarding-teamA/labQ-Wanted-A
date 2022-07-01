const express = require("express");
const result = require("./result");
const router = express.Router();

router.use("/result", result);

module.exports = router;
