const dotenv = require("dotenv");
const express = require("express");
const request = require("request");

dotenv.config();
const router = express.Router();

const url = "http://openAPI.seoul.go.kr:8088/";
const SERVICE_KEY = process.env.RAIN_FALL_API_KEY;
const requestUrl = `${url}${SERVICE_KEY}/json/ListRainfallService/1/6/`;

router.get("/", (req, res) => {
  const rainFallInfo = request(requestUrl, (error, response, body) => {
    console.log(JSON.parse(body).ListRainfallService.row);
  });
  return rainFallInfo;
});

module.exports = router;