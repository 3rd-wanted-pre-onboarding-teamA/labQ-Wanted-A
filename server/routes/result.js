const express = require("express");
const drainpipeInfo = require('../../request/drainPipe');
const rainFallInfo = require('../../request/rainFall');

const router = express.Router();

router.get("/:code", async (req, res) => {
  const code = req.params.code;
  const drainPipeArr = await drainpipeInfo(code);
  const area = drainPipeArr[0].location;
  const rainFallArr = await rainFallInfo(area);
  console.log('----하수관로 수위 현황----');
  console.log(drainPipeArr);
  console.log();
  console.log('----강우량 현황----');
  console.log(rainFallArr);
});

module.exports = router;
