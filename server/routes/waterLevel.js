const dotenv = require("dotenv");
const express = require("express");
const request = require("request");
Date.prototype.YYYYMMDDHH = function () {
  var yyyy = this.getFullYear().toString();
  var MM = pad(this.getMonth() + 1, 2);
  var dd = pad(this.getDate(), 2);
  var hh = pad(this.getHours(), 2);

  return yyyy + MM + dd + hh;
};

Date.prototype.YYYYMMDDHH_1hour = function () {
  var yyyy = this.getFullYear().toString();
  var MM = pad(this.getMonth() + 1, 2);
  var dd = pad(this.getDate() - 1, 2);
  var hh = pad(this.getHours() - 1, 2);

  return yyyy + MM + dd + hh;
};

function pad(number, length) {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}

let nowDate = new Date();
let nowDateString = nowDate.YYYYMMDDHH().toString();
let oneHourBeforeDateString = nowDate.YYYYMMDDHH_1hour().toString();

dotenv.config();
const router = express.Router();

const url = "http://openAPI.seoul.go.kr:8088/";
const SERVICE_KEY = process.env.WATER_LEVEL_API_KEY;
const requestUrl = `${url}${SERVICE_KEY}/json/DrainpipeMonitoringInfo/1/3/01/${oneHourBeforeDateString}/${nowDateString}`;

router.get("/", (req, res) => {
  const drainpipeInfo = request(requestUrl, (error, response, body) => {
    JSON.parse(body);
  });
  return drainpipeInfo;
});

module.exports = router;
