// "http://openAPI.seoul.go.kr:8088/(인증키)/json/DrainpipeMonitoringInfo/1/5/01/2019120614/2019120615";
const dotenv = require("dotenv");
const express = require("express");
const request = require("request");

dotenv.config();
const router = express.Router();

const url = "http://openAPI.seoul.go.kr:8088/";
const SERVICE_KEY = process.env.WATER_LEVEL_API_KEY;
const requestUrl = `${url}${SERVICE_KEY}/json/DrainpipeMonitoringInfo/1/3/01/2022062914/2022062915`;

router.get('/', (req, res) => {
  const drainpipeInfo = request(requestUrl, (error, response, body) => {
    JSON.parse(body).DrainpipeMonitoringInfo.row.forEach(data => {
      console.log(data.GUBN_NAM);
      console.log(data.MEA_WAL);
    })
  });
  return drainpipeInfo;
});

module.exports = router;