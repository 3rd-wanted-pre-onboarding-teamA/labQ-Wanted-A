const dotenv = require("dotenv");
const request = require("request");

dotenv.config();

// 서울시 하수관로 수위 현황
// open API: https://data.seoul.go.kr/dataList/OA-2527/S/1/datasetView.do
const rainFall = (area) => {
  const url = "http://openapi.seoul.go.kr:8088/";
  const SERVICE_KEY = process.env.RAIN_FALL_API_KEY;
  const localName = area + "구";
  const num = 1000;
  let requestUrl = encodeURI(`${url}${SERVICE_KEY}/json/ListRainfallService/1/${num}/${localName}`); // encodeURI를 이용하여 "localName"(특정 문자) 인코딩

  return new Promise((resolve, reject) => {
    request(requestUrl, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body).ListRainfallService);
        // fulfilled - 상태코드가 200일 때 JSON에 있는 데이터 출력
      } else {
        // rejected - 에러 났을 때 에러 출력
        console.log(error);
        reject(error);
      }
    });
  });
};

module.exports = rainFall;
