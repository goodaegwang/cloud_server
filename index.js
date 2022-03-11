const mysql = require("mysql"); //My-sql을 사용하였다.
const mybatisMapper = require("mybatis-mapper"); //매핑할 마이바티스

const connection = mysql.createConnection({
  //커넥션 생성
  host: "127.0.0.1",
  user: "simplatform",
  database: "iot_cloud",
  password: "Simplatform!@3",
});

//흔히 알고있는 매퍼로드(xml이 있는 디렉토리 주소&파일위치를 입력하여주세요!!!)
mybatisMapper.createMapper(["./query.xml"]); //예) xml파일이 D드라이브에 있다면, D:/매퍼.xml

//조회할 파라미터
var param = {
  test_id: 1,
};

//질의문 형식
var format = { language: "sql", indent: "  " };
var query = mybatisMapper.getStatement(
  "testMapper",
  "testBasic",
  param,
  format
);
//첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

console.log(query); //해당쿼리가 조합된 것을 볼 수 있다.

connection.connect();
connection.query(query, function (error, results, fields) {
  //조회
  if (error) {
    console.log(error);
  }
  console.log(results);
});
connection.end();
