const express = require("express");
const drainpipeInfo = require("../../request/drainPipe");
const rainFallInfo = require("../../request/rainFall");
const df = require("dataframe-js");
const statusCode = require("../constants/statusCode");

const router = express.Router();

/**
 * @code writer 허정연
 * @description 구분 코드로 가져온 두 가지 api를 전처리하여 innerjoin묶어 처리한 API 구현
 * @ref 서울시 하수관로 수위 현황 openAPI: "https://data.seoul.go.kr/dataList/OA-2527/S/1/datasetView.do"
 * @ref 서울시 강우량 정보 openAPI: "http://data.seoul.go.kr/dataList/OA-1168/S/1/datasetView.do"
 *
 * @GET("/api/result1?code=06")
 * @param GUBN
 *
 * @returns json
 */

router.get("/", async (req, res) => {
  const code = req.query.code;
  const drainPipeArr = await drainpipeInfo(code);
  const area = drainPipeArr.row[0].GUBN_NAM;
  const rainFallArr = await rainFallInfo(area);
  const resultCode = drainPipeArr.RESULT.CODE;

  // 하수관로 수위 현황
  let dfPipe = new df.DataFrame(drainPipeArr.row); // 데이터프레임 생성
  dfPipe = dfPipe.cast("MEA_YMD", String); // 형변환
  dfPipe = dfPipe.map((row) => row.set("MEA_YMD", row.get("MEA_YMD").substr(0, 16))); // 날짜 형식 강우량과 맞추기 (년-월-일 시:분)
  dfPipe = dfPipe.groupBy("MEA_YMD").aggregate((group) => group.stat.mean("MEA_WAL")); // 날짜로 그룹화하여 MEA_WAL 칼럼 평균
  dfPipe = dfPipe.renameAll(["date", "waterLevel"]); // 칼럼명 변경

  // 강우량 현황
  let dfRain = new df.DataFrame(rainFallArr.row);
  dfRain = dfRain.groupBy("RECEIVE_TIME").aggregate((group) => group.stat.mean("RAINFALL10")); // 날짜로 그룹화하여 rainFall 칼럼 평균
  dfRain = dfRain.renameAll(["date", "rainFall"]);
  dfRain = dfRain.cast("date", String); // inner join을 위한 형변환
  dfPipe = dfPipe.innerJoin(dfRain, "date"); // innerjoin으로 공통된 시간인 10분 단위로 값 출력
  dfPipe = dfPipe.cast("waterLevel", String);
  dfPipe = dfPipe.map((row) => row.set("waterLevel", row.get("waterLevel").substr(0, 5))); // 소수점 자르기
  dfPipe = dfPipe.withColumn("localname", () => area); // localname 칼럼 추가
  dfPipe = dfPipe.restructure(["localname", "date", "waterLevel", "rainFall"]); // 칼럼 순서 변경

  // 결합한 데이터 출력
  if (statusCode[200].includes(resultCode)) {
    let res = {
      CODE: 200,
      GUBN: area,
      GUBN_NUM: code,
      RESULT: dfPipe.toCollection()
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
