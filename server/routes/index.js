const express = require("express");
const router = express.Router();
const result2 = require("./result2");
const result1 = require("./result1");

/**
 * @code writer 장덕수
 * @description api 설계 및 미들웨어 생성
 *
 * @GET ("/api/seoul-rainfall-drainpipe-data1?cityId=01")
 * @GET ("/api/seoul-rainfall-drainpipe-data2?cityId=01")
 * 
 * @returns json
 */

router.use("/seoul-rainfall-drainpipe-data1", result1);
router.use("/seoul-rainfall-drainpipe-data2", result2);

module.exports = router;
