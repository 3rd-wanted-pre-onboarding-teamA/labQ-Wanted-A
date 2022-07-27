<div align="center">

  # 서울시 하수관로 수위 현황과 강우량 정보 데이터를 활용한 REST API구현 ☔️
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Swift&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2S&logoColor=white"/>
</p>

  ## 🌈 Team A members  

  |황선영|이승연|허정연|장덕수|
  |:------:|:------:|:------:|:------:|
  |[Github](https://github.com/syoungee) | [Github](https://github.com/dltmddus1998) | [Github](https://github.com/golgol22) | [Github](https://github.com/dapsu) |

</div> 
<br/>


## 📒 Project

  <h4> ⏳  개발 기간  ⏳ </h4> 
  2022/06/29  ~ 2022/07/01 
  
  [📑 LabQ 기업과제 요구사항 분석](https://misty-lungfish-f16.notion.site/LabQ-OpenAPI-cc0e492facda4abfadabd844f843004d)

   ## ✍🏻 프로젝트 요구사항
  ```
  Open API를 활용하여 공공데이터 수집 및 가공, 데이터 전달하는 REST API 개발

- Node.js를 이용하여 REST API 개발
- 서울시 `하수관로 수위 현황`과 `강우량` 정보 json 방식으로 전달받아 데이터 결합
- 결합된 데이터 출력
  ```

  ✔️ [하수관로 수위 현황 openAPI](https://data.seoul.go.kr/dataList/OA-2527/S/1/datasetView.do)  
  
  ✔ [강우량 정보 openAPI](http://data.seoul.go.kr/dataList/OA-1168/S/1/datasetView.do)


  ## 🎬 프로젝트 시연
  ```
    방법1) 공통된 시간대의 하수관로 수위와 강우량을 동시에 확인 할 수 있게 데이터 결합
    방법2) 받아온 모든 데이터를 누락없이 제공할 수 있도록 병렬 처리
  ```
 [방법 1) 테스트 링크(click!)](http://52.198.238.244:3000/api/seoul-rainfall-drainpipe-data1?cityId=01)

 [방법 2) 테스트 링크(click!)](http://52.198.238.244:3000/api/seoul-rainfall-drainpipe-data2?cityId=01)
 
 <span style="background-color: #dcffe4">
    cityId를 변경해가면서 테스트 가능합니다
</span>

  
  <br/>

  <span style="background-color: #dcffe4"></span>
 


## 🍉 RestAPI



  |  | METHOD | URL | 
| --- | --- | --- | 
| 방법1 | GET | api/seoul-rainfall-drainpipe-data1?cityId=?|
| 방법2 | GET | api/seoul-rainfall-drainpipe-data1?cityId=? |


