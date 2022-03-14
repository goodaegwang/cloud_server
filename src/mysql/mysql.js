const fs = require("fs");
const mybatisMapper = require("mybatis-mapper");
const mysql = require("mysql");
// const winston = require("winston");

class mysqlManager {
  // logger = winston.Logger;

  async init(queryPathList) {
    const connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "simplatform",
      database: "iot_cloud",
      password: "Simplatform!@3",
    });

    if (queryPathList != "") {
      let files = fs.readdirSync(queryPathList);

      const results = [];

      files.map(file => {
        results.push(`${queryPathList}/${file}`);
      });

      mybatisMapper.createMapper(results);
    }

    return connection;
  }

  async querySingle(queryList, queryPathList) {
    try {
      const connection = await this.init(queryPathList);

      const format = { language: "sql", indent: "  " };
      const query = mybatisMapper.getStatement(
        queryList.namespace,
        queryList.sqlId,
        queryList.param,
        format
      );

      connection.connect();

      // console.log("====================================================");
      // console.log(`= sql [${queryList.namespace}/${queryList.sqlId}]`);
      // console.log(`${query}`);
      // console.log("====================================================");

      const results = connection.query(
        query,
        function (error, results, fields) {
          if (error) throw error;
        }
      );

      return results;
    } catch (err) {
      throw err.message;
    }
  }
}

module.exports = new mysqlManager();
