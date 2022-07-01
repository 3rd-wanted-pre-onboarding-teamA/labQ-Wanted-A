const dotenv = require("dotenv");
const request = require("request");
const qs = require("querystring");

dotenv.config();

const rainFall = (area) => {
  const url = "http://openapi.seoul.go.kr:8088/";
  const SERVICE_KEY = process.env.RAIN_FALL_API_KEY;
  const localName = area + "구";
  const num = 1000
  let requestUrl = `${url}${SERVICE_KEY}/json/ListRainfallService/1/${num}/`;
  requestUrl += qs.escape(localName);
  const data = [];
  return new Promise((resolve, reject) => {
    request(requestUrl, (error, response, body) => {
      JSON.parse(body).ListRainfallService.row.forEach((elem) => {
        data.push({
          location: elem.GU_NAME,
          rainFall: elem.RAINFALL10,
          date: elem.RECEIVE_TIME,
        });
      });
      resolve(data);
    });
  });
};

module.exports = rainFall;
