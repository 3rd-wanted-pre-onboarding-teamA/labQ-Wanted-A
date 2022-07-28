<div align="center">

  # 서울시 하수관로 수위 현황과 강우량 정보 데이터를 활용한 REST API구현 ☔️
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Swift&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2&logoColor=white"/>
  <img src="https://img.shields.io/badge/Dataframejs-880000?style=flat&logo=dataframe-js&logoColor=white"/>
  <img src="https://img.shields.io/badge/OpenAPI-000099?style=flat&logo=openapi&logoColor=white"/>
</p>

  ## 🌈 Team A members  

  |황선영|이승연|허정연|장덕수|
  |:------:|:------:|:------:|:------:|
  |[Github](https://github.com/syoungee) | [Github](https://github.com/dltmddus1998) | [Github](https://github.com/golgol22) | [Github](https://github.com/dapsu) |

</div> 
<br/>


## ⏳  개발 기간
2022.06.29 ~ 2022.07.01    

<br/>

## ✍🏻 프로젝트 요구사항
[📑 LabQ 기업과제 요구사항 상세분석](https://misty-lungfish-f16.notion.site/LabQ-OpenAPI-cc0e492facda4abfadabd844f843004d)
```
Open API를 활용하여 공공데이터 수집 및 가공, 데이터 전달하는 REST API 개발

- Node.js를 이용하여 REST API 개발
- 서울시 `하수관로 수위 현황`과 `강우량` 정보 json 방식으로 전달받아 데이터 결합
- 결합된 데이터 출력
```

✔️ [하수관로 수위 현황 openAPI](https://data.seoul.go.kr/dataList/OA-2527/S/1/datasetView.do)  

✔ [강우량 정보 openAPI](http://data.seoul.go.kr/dataList/OA-1168/S/1/datasetView.do)  

<br/>
  
## 🎬 프로젝트 시연
```
  방법1) 공통된 시간대의 하수관로 수위와 강우량을 동시에 확인 할 수 있게 데이터 결합
  방법2) 받아온 모든 데이터를 누락없이 제공할 수 있도록 union 처리
```
[방법 1) 테스트 링크(click!)](http://52.197.52.134/api/seoul-rainfall-drainpipe-data1?cityId=01)

[방법 2) 테스트 링크(click!)](http://52.197.52.134/api/seoul-rainfall-drainpipe-data2?cityId=02)

✔️ `cityId=01`를 변경해가면서 테스트 가능합니다   

✔️ `cityId의 범위는 01~25`까지 가능합니다

<br/>

## 🗨️ 개발 내용
#### 데이터 결합 방법1: inner join (수평결합 - dataframe-js를 사용)

- 하수관로 현황 데이터를 데이터 프레임으로 생성
```javascript
let dfPipe = new df.DataFrame(drainPipeArr.row); // 데이터프레임 생성
dfPipe = dfPipe.cast("MEA_YMD", String); // 형변환
dfPipe = dfPipe.map((row) => row.set("MEA_YMD", row.get("MEA_YMD").substr(0, 16))); // 날짜 형식 강우량과 맞추기 (년-월-일 시:분)
dfPipe = dfPipe.groupBy("MEA_YMD").aggregate((group) => group.stat.mean("MEA_WAL")); // 날짜로 그룹화하여 MEA_WAL 칼럼 평균
dfPipe = dfPipe.renameAll(["date", "waterLevel"]); // 칼럼명 변경
```

- 강우량 현황 데이터를 데이터 프레임으로 생성
```javascript
let dfRain = new df.DataFrame(rainFallArr.row);
dfRain = dfRain.groupBy("RECEIVE_TIME").aggregate((group) => group.stat.mean("RAINFALL10")); // 날짜로 그룹화하여 rainFall 칼럼 평균
dfRain = dfRain.renameAll(["date", "rainFall"]);
```

- 두 데이터 innerjoin으로 결합 후 형식에 맞게 출력
```javascript
dfRain = dfRain.cast("date", String); // inner join을 위한 형변환
dfPipe = dfPipe.innerJoin(dfRain, "date"); // innerjoin으로 공통된 시간인 10분 단위로 값 출력
dfPipe = dfPipe.cast("waterLevel", String);
dfPipe = dfPipe.map((row) => row.set("waterLevel", row.get("waterLevel").substr(0, 5))); // 소수점 자르기
dfPipe = dfPipe.withColumn("localname", () => area); // localname 칼럼 추가
dfPipe = dfPipe.restructure(["localname", "date", "waterLevel", "rainFall"]); // 칼럼 순서 변경
console.log(dfPipe.toCollection());
```

#### 데이터 결합 방법2: union (수직결합)

```javascript
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
```

<br/>

## 🍉 REST API

  |  | METHOD | URL | 
| --- | --- | --- | 
| 방법1 | GET | api/seoul-rainfall-drainpipe-data1?cityId=?|
| 방법2 | GET | api/seoul-rainfall-drainpipe-data1?cityId=? |
