# labQ wanted teamA mission

## 👥 Team


- [황선영](https://github.com/syoungee)
- [이승연](https://github.com/dltmddus1998)
- [허정연](https://github.com/golgol22)
- [장덕수](https://github.com/dapsu)

`프로젝트 진행기간 2022.06.29 ~ 2022.07.01 18:00`

## ⚒️ 기술 스택


![image](https://img.shields.io/badge/LAN-JavaScript-%23F7DF1E?style=for-the-badge&logo=JavaScript)

![image](https://img.shields.io/badge/FRM-Node.js-%23339933?style=for-the-badge&logo=Node.js)

![image](https://img.shields.io/badge/FRM-Express-%23000000?style=for-the-badge&logo=Express)

![image](https://img.shields.io/badge/DB-MySQL-%234479A1?style=for-the-badge&logo=MySQL)

## ✍️ 서비스 개요


- 서울시 하수관로 수위 현황과 강우량 정보 데이터를 수집 및 가공하여 전달하는 REST API와 이를 요청하는 클라이언트 개발

## 🔗 Open API


- [https://data.seoul.go.kr/dataList/OA-2527/S/1/datasetView.do](https://data.seoul.go.kr/dataList/OA-2527/S/1/datasetView.do)
- [http://data.seoul.go.kr/dataList/OA-1168/S/1/datasetView.do](http://data.seoul.go.kr/dataList/OA-1168/S/1/datasetView.do)

## 📑 요구사항 분석


- REST API
    - 서울시 하수관로 수위 현황과 강우량 정보 데이터 수집
        - 서울시 하수관로 수위 현황
            - [x]  측정일자
            - [x]  구분명(지역명)
            - [x]  측정수위
        - 강우량 정보 데이터
            - [x]  자료수집 시각
            - [x]  구청명
            - [x]  10분 우량
    - 출력값 중 GUBN_NAM과 GU_NAME 기준으로 데이터 결합
        
        > **하수관로 수위 현황의 측정일자와 강우량 정보 데이터의 자료수집 시각이 일치할 때 데이터를 결합하도록 한다.**
        > 
        - [x]  날짜
        - [x]  구분명(지역명)
        - [x]  측정수위
        - [x]  10분 우량
    - 데이터는 JSON으로 전달
        
        ```json
        
        ```
        
- Client
    - 구분코드를 명시해서 REST API 호출하기
    - 서버에서 전송받은 결과 출력
        - 콘솔에 로그로 출력

## 📜 REST API


| Method | Request | URL |
| --- | --- | --- |
| GET | 서울시 하수관로 수위 현황 | http://localhost:8080/ |
| GET | 강우량 정보 데이터 | http://localhost:8080/ |
| GET | 출력값 중 GUBN_NAM과 GU_NAME 기준으로 데이터 결합 | http://localhost:8080/ |
