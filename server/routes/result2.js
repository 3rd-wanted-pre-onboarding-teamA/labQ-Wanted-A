const express = require("express");
const drainpipeInfo = require("../../request/drainPipe");
const rainFallInfo = require("../../request/rainFall");

const router = express.Router();

router.get("/", async (req, res) => {
  const code = req.query.code;
  const drainPipeArr = await drainpipeInfo(code);
  const area = drainPipeArr.row[0].GUBN_NAM;
  const rainFallArr = await rainFallInfo(area);

  if (drainPipeArr.RESULT.MESSAGE === "정상 처리되었습니다") {
    let res = {
      CODE: 200,
      GUBN: area,
      GUBN_NUM: code,
      DRAINPIPE: drainPipeArr.row,
      RAINFALL: rainFallArr.row,
    };
    console.log(JSON.stringify(res, undefined, 2));
    return JSON.stringify(res);
  }
  // TODO: ERROR시 CODE_NUM 띄워주기
});

module.exports = router;
