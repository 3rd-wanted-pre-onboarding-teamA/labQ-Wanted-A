// "http://openAPI.seoul.go.kr:8088/(인증키)/json/DrainpipeMonitoringInfo/1/5/01/2019120614/2019120615";
const dotenv = require("dotenv");
const request = require("request");

dotenv.config();

const drainpipeInfo = (code) => {
  const url = "http://openAPI.seoul.go.kr:8088/";
  const SERVICE_KEY = process.env.WATER_LEVEL_API_KEY;
  const requestUrl = `${url}${SERVICE_KEY}/json/DrainpipeMonitoringInfo/1/5/${code}/2022062914/2022062915`;
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