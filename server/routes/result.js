const express = require("express");
const drainpipeInfo = require('../../request/drainPipe');

const router = express.Router();

router.get("/:code", (req, res) => {
  const code = parseInt(req.params.code, 10);
  const result = drainpipeInfo(code);
  console.log(result);
});

module.exports = router;
