const dotenv = require("dotenv");
const request = require("request");


dotenv.config(); 

const rainFall = (area) => {
  const url = "http://openapi.seoul.go.kr:8088/";
  const SERVICE_KEY = process.env.RAIN_FALL_API_KEY;
  const localName = area + "구";
  const num = 1000;
  let requestUrl = encodeURI(`${url}${SERVICE_KEY}/json/ListRainfallService/1/${num}/${localName}`);

  return new Promise((resolve, reject) => {
    request(requestUrl, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body).ListRainfallService);
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
};

module.exports = rainFall;
