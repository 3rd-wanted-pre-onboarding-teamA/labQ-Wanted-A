// "http://openAPI.seoul.go.kr:8088/(인증키)/json/DrainpipeMonitoringInfo/1/5/01/2019120614/2019120615";
const dotenv = require("dotenv");
const request = require("request");
const { json } = require("stream/consumers");

dotenv.config();

const drainpipeInfo = (code) => {
  const url = "http://openAPI.seoul.go.kr:8088/";
  const SERVICE_KEY = process.env.WATER_LEVEL_API_KEY;
  const requestUrl = `${url}${SERVICE_KEY}/json/DrainpipeMonitoringInfo/${code}/5/01/2022062914/2022062915`;
  const data = [];
  request(requestUrl, (error, response, body) => {
    JSON.parse(body).DrainpipeMonitoringInfo.row.forEach(elem => {
      const obj = {};
      obj['code'] = elem.GUBN;
      obj['local'] = elem.GUBN_NAM;
      obj['waterLevel'] = elem.MEA_WAL;
      obj['time'] = elem.MEA_YMD;
      data.push(obj);
    });
  });

  return data;
};

module.exports = drainpipeInfo;