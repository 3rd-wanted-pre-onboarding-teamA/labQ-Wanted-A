const dotenv = require("dotenv");
const request = require("request");

dotenv.config();

Date.prototype.YYYYMMDDHH = function () {
  var yyyy = this.getFullYear().toString();
  var MM = pad(this.getMonth() + 1, 2);
  var dd = pad(this.getDate(), 2);
  var hh = pad(this.getHours(), 2);

  return yyyy + MM + dd + hh;
};

Date.prototype.YYYYMMDDHH_1hour = function () {
  var yyyy = this.getFullYear().toString();
  var MM = pad(this.getMonth() + 1, 2);
  var dd = pad(this.getDate(), 2);
  var hh = pad(this.getHours() - 1, 2);

  return yyyy + MM + dd + hh;
};

function pad(number, length) {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}

const drainpipeInfo = (code) => {
  const url = "http://openAPI.seoul.go.kr:8088/";
  const SERVICE_KEY = process.env.WATER_LEVEL_API_KEY;
  let nowDate = new Date();
  let nowDateString = nowDate.YYYYMMDDHH().toString();
  let oneHourBeforeDateString = nowDate.YYYYMMDDHH_1hour().toString();
  const requestUrl = `${url}${SERVICE_KEY}/json/DrainpipeMonitoringInfo/1/5/${code}/${oneHourBeforeDateString}/${nowDateString}`;
  return new Promise((resolve, reject) => {
    request(requestUrl, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body).DrainpipeMonitoringInfo);
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
};

module.exports = drainpipeInfo;
