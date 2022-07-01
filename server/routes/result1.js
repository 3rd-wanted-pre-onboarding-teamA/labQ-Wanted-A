const express = require("express");
const drainpipeInfo = require("../../request/drainPipe");
const rainFallInfo = require("../../request/rainFall");
const df = require("dataframe-js");

const router = express.Router();

router.get("/", async (req, res) => {
  const code = req.query.code;
  const drainPipeArr = await drainpipeInfo(code);
  const area = drainPipeArr[0].location;
  const rainFallArr = await rainFallInfo(area);

  // 하수관로 수위 현황
  for (const arr of drainPipeArr) {
    arr.date = arr.date.slice(0, -5); // 날짜 형식 강우량과 맞추기 (년-월-일 시:분)
  }
  let dfPipe = new df.DataFrame(drainPipeArr); // 데이터프레임 생성
  dfPipe = dfPipe.groupBy("date").aggregate((group) => group.stat.mean("waterLevel")); // 날짜로 그룹화하여 waterLevel 칼럼 평균
  dfPipe = dfPipe.renameAll(["date", "waterLevel"]); // 칼럼명 변경

  // 강우량 현황
  let dfRain = new df.DataFrame(rainFallArr);
  dfRain = dfRain.groupBy("date").aggregate((group) => group.stat.mean("rainFall")); // 날짜로 그룹화하여 rainFall 칼럼 평균
  dfRain = dfRain.renameAll(["date", "rainFall"]); // 칼럼명 변경
  dfPipe = dfPipe.innerJoin(dfRain, "date"); // innerjoin으로 공통된 시간인 10분 단위로 값 출력

  // 결합한 데이터 출력
  console.log("========= [" + area + "구] =========");
  for (const item of dfPipe.toArray()) {
    console.log("date: " + item[0]);
    console.log("waterLevel: " + item[1]);
    console.log("rainFall: " + item[2]);
    console.log("==========================");
  }
});

module.exports = router;
