const express = require("express");
const waterlevel = require("./waterLevel");
const rainFall = require("./rainFall");
const result = require('./result');
const router = express.Router();

router.use("/WaterLevel", waterlevel);
router.use("/RainFall", rainFall);
router.use('/result', result);

module.exports = router;