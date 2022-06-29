// "http://openAPI.seoul.go.kr:8088/(인증키)/json/DrainpipeMonitoringInfo/1/5/01/2019120614/2019120615";
const dotenv = require("dotenv").config({ path: "../../.env" });

console.log(dotenv.parsed.WATER_LEVEL_API_KEY);
const request = require("request");

const url = "http://openAPI.seoul.go.kr:8088/";

const SERVICE_KEY = dotenv.parsed.WATER_LEVEL_API_KEY;
const requestUrl = `${url}${SERVICE_KEY}/json/DrainpipeMonitoringInfo/1/5/01/2019120614/2019120615`;

request(requestUrl, (error, response, body) => {
  console.log(requestUrl);
  console.error("error:", error);
  console.log("statusCode:", response && response.statusCode);
  console.log(JSON.parse(body));
});
