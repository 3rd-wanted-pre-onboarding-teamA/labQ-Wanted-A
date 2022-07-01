const express = require("express");
const drainpipeInfo = require("../../request/drainPipe");
const rainFallInfo = require("../../request/rainFall");
const df = require("dataframe-js");

const router = express.Router();

router.get("/", async (req, res) => {
  const code = req.query.code;
  const drainPipeArr = await drainpipeInfo(code);
  const area = drainPipeArr.row[0].GUBN_NAM;
  const rainFallArr = await rainFallInfo(area);

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
  console.log(dfPipe.toCollection());
});

module.exports = router;
