// "http://openAPI.seoul.go.kr:8088/(인증키)/json/DrainpipeMonitoringInfo/1/5/01/2019120614/2019120615";
const dotenv = require("dotenv");
const request = require("request");
require("date-utils");

dotenv.config();

const drainpipeInfo = (code) => {
  const url = "http://openAPI.seoul.go.kr:8088/";
  const SERVICE_KEY = process.env.WATER_LEVEL_API_KEY;
  const num = 1000
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
  const data = [];
  return new Promise((resolve, reject) => {
    request(requestUrl, (error, response, body) => {
      JSON.parse(body).DrainpipeMonitoringInfo.row.forEach((elem) => {
        data.push({
          location: elem.GUBN_NAM,
          waterLevel: elem.MEA_WAL,
          date: elem.MEA_YMD,
        });
      });
      resolve(data);
    });
  });
};

module.exports = drainpipeInfo;