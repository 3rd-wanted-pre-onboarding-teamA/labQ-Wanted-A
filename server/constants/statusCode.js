// openAPI 출력 상태 메시지
/**
 * @code sub_writer 장덕수
 * @description 서울 하수관로 수위 현황 API 요청 시 받는 상태코드 정리
 */
 const statusCode = {
  200: ["INFO-000"],
  400: ["ERROR-300", "ERROR-301", "ERROR-310"],
  404: ["INFO-200"],
  500: [
    "INFO-100",
    "ERROR-331",
    "ERROR-332",
    "ERROR-333",
    "ERROR-334",
    "ERROR-335",
    "ERROR-336",
    "ERROR-500",
    "ERROR-600",
    "ERROR-601",
  ],
};

module.exports = statusCode;