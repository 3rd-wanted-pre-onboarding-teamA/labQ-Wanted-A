const express = require("express");
const router = express.Router();
const result2 = require("./result2");
const result1 = require("./result1");

router.use("/result1", result1);
router.use("/result2", result2);

module.exports = router;
