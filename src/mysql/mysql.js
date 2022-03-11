const fs = require("fs");
const mysql = require("mysql");
const mybatisMapper = require("mybatis-mapper");
const config = require("../../config/default.json");
const MybatisMapper = require("mybatis-mapper");
// const winston = require("winston");

const connection = mysql.createConnection(mysql.createPool(config));

class mysqlManager {
  // logger = winston.Logger;

  async init(queryPathList) {
    mybatisMapper.createMapper(fs.readdirSync(queryPathList));
  }

  async querySingle(queryList) {
    const format = { language: "sql", indent: "" };

    const query = MybatisMapper.getStatement(
      queryList.namespace,
      queryList.sqlId,
      queryList.param,
      format
    );

    connection.connect();

    // this.logger.debug("====================================================");
    // this.logger.debug(`= sql [${queryList.namespace}/${queryList.sqlId}]`);
    // this.logger.debug(`${query}`);
    // this.logger.debug("====================================================");

    connection.query(query, function (error, results, fields) {
      if (error) {
        this.logger.debug(error);
      }
      this.logger.debug(results);
    });
    connection.end();

    return results;
  }
}

module.exports = new mysqlManager();
