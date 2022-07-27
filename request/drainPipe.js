const dotenv = require("dotenv");
const request = require("request");
require("date-utils");

dotenv.config();

// 서울시 강우량 현황
// open API: http://data.seoul.go.kr/dataList/OA-1168/S/1/datasetView.do
const drainpipeInfo = (code) => {
  const url = "http://openAPI.seoul.go.kr:8088/";
  const SERVICE_KEY = process.env.WATER_LEVEL_API_KEY;
  // 최대로 요청할 수 있는 데이터 수 = 1000개
  const num = 1000;
  // Date()를 이용해 현재날짜 + 시간 표현
  const nowTime = new Date();
  const endDate = nowTime.toFormat("YYYYMMDDHH24");
  let startDate = nowTime.toFormat("YYYYMMDD");
  let hour = nowTime.getHours() - 1;
  if (hour < 10) {
    // 2022070109 - 현재 시각이 한 자리 수 인 경우
    startDate = startDate + "0" + hour;
  } else {
    // 2022070112 - 현재 시각이 두 자리 수 인 경우
    startDate = startDate + hour;
  }
  const requestUrl = `${url}${SERVICE_KEY}/json/DrainpipeMonitoringInfo/1/${num}/${code}/${startDate}/${endDate}`;
  return new Promise((resolve, reject) => {
    request(requestUrl, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body).DrainpipeMonitoringInfo); // fulfilled - 상태코드가 200일 때 JSON에 있는 데이터 출력
      } else {
        // rejected - 에러 났을 때 에러 출력
        console.log(error);
        reject(error);
      }
    });
  });
};

module.exports = drainpipeInfo;
