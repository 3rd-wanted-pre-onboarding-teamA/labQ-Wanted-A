const express = require("express");
const drainpipeInfo = require("../../request/drainPipe");
const rainFallInfo = require("../../request/rainFall");
const statusCode = require("../constants/statusCode");

const router = express.Router();

/**
 * @code writer 황선영
 * @description 구분 코드로 가져온 두 가지 api를 병렬 처리한 API 구현
 * @ref 서울시 하수관로 수위 현황 openAPI: "https://data.seoul.go.kr/dataList/OA-2527/S/1/datasetView.do"
 * @ref 서울시 강우량 정보 openAPI: "http://data.seoul.go.kr/dataList/OA-1168/S/1/datasetView.do"
 *
 * @GET ("/api/seoul-rainfall-drainpipe-data2?cityId=01")
 * @param GUBN
 *
 * @returns json
 */

router.get("/", async (req, res) => {
  const code = req.query.cityId;
  const drainPipeArr = await drainpipeInfo(code);
  const area = drainPipeArr.row[0].GUBN_NAM;
  const rainFallArr = await rainFallInfo(area);
  const resultCode = drainPipeArr.RESULT.CODE;

  if (drainPipeArr.RESULT.MESSAGE === "정상 처리되었습니다") {
    let res = {
      CODE: 200, //처리상태
      GUBN: area, // 구이름
      GUBN_NUM: code, // 구코드
      DRAINPIPE: drainPipeArr.row.slice(-10, -1), // 1000개 중 뒤에서 10개만 가져오기
      RAINFALL: rainFallArr.row.slice(-10, -1), // 1시간 정도의 데이터 가져오기
    };
    console.log(JSON.stringify(res, undefined, 2));
    return JSON.stringify(res);
  } else if (statusCode[400].includes(resultCode)) {
    // API 오류: 잘못된 API를 요청했을 때 400 반환
    return res.status(400).end();
  } else if (statusCode[404].includes(resultCode)) {
    // 404 파라미터 오류: 잘못된 파라미터 값을 요청했을 때 404 반환
    return res.status(404).end();
  } else {
    // 서버 오류일 때 500 반환
    return res.status(500).end();
  }
});

module.exports = router;
