const dotenv = require("dotenv");
const request = require("request");
require("date-utils");

dotenv.config();

const drainpipeInfo = (code) => {
  const url = "http://openAPI.seoul.go.kr:8088/";
  const SERVICE_KEY = process.env.WATER_LEVEL_API_KEY;
  const num = 1000;
  const nowTime = new Date();
  const endDate = nowTime.toFormat("YYYYMMDDHH24");
  let startDate = nowTime.toFormat("YYYYMMDD");
  let hour = nowTime.getHours() - 1;
  if (hour < 10) {
    startDate = startDate + "0" + hour;
  } else {
    startDate = startDate + hour;
  }
  const requestUrl = `${url}${SERVICE_KEY}/json/DrainpipeMonitoringInfo/1/${num}/${code}/${startDate}/${endDate}`;
  return new Promise((resolve, reject) => {
    request(requestUrl, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body).DrainpipeMonitoringInfo);
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
};

module.exports = drainpipeInfo;
