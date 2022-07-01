const express = require("express");
const drainpipeInfo = require("../../request/drainPipe");
const rainFallInfo = require("../../request/rainFall");

const router = express.Router();

/**
 * @code writer 황선영
 * @description 구분 코드로 가져온 두 가지 api를 병렬 처리한 API 구현
 * @ref 서울시 하수관로 수위 현황 openAPI: "https://data.seoul.go.kr/dataList/OA-2527/S/1/datasetView.do"
 * @ref 서울시 강우량 정보 openAPI: "http://data.seoul.go.kr/dataList/OA-1168/S/1/datasetView.do"
 *
 * @GET("/api/result2?code=06")
 * @param GUBN
 *
 * @returns json
 */

router.get("/", async (req, res) => {
  const code = req.query.code;
  const drainPipeArr = await drainpipeInfo(code);
  const area = drainPipeArr.row[0].GUBN_NAM;
  const rainFallArr = await rainFallInfo(area);

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
  }
  // TODO: ERROR시 CODE_NUM 띄워주기
});

module.exports = router;
