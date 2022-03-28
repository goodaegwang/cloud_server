const mysql = require("mysql");
const config = require("config");
const fs = require("fs");
const path = require("path");
const mybatisMapper = require("mybatis-mapper");
const queryDirPath = path.join(__dirname, "../mybatis");

class MysqlManager {
  // async init(queryPathList) {
  //   const connection = mysql.createConnection({
  //     host: "127.0.0.1",
  //     user: "simplatform",
  //     database: "iot_cloud",
  //     password: "Simplatform!@3",
  //   });

  //   if (queryPathList != "") {
  //     let files = fs.readdirSync(queryPathList);

  //     const results = [];

  //     files.map(file => {
  //       results.push(`${queryPathList}/${file}`);
  //     });

  //     mybatisMapper.createMapper(results);
  //   }

  //   return connection;
  // }

  constructor() {
    this.pool = null;
  }

  async init() {
    this.pool = mysql.createPool(config.get("mysql"));

    const connection = await this.getConnection();

    connection.release();

    // logger.debug(
    //   `mysql host=${config.get("mysql.host")} database=${config.get(
    //     "mysql.database"
    //   )}`
    // );
    console.log(
      `mysql host=${config.get("mysql.host")} database=${config.get(
        "mysql.database"
      )}`
    );
    console.log("mysql connection success!");
    mybatisMapper.createMapper(
      fs.readdirSync(queryDirPath).map(file => path.join(queryDirPath, file))
    );

    // per 1 hour
    setInterval(this.maintainConnection.bind(this), 3600000);
  }

  async getConnection() {
    console.log("call getConnection()");

    try {
      return await this.pool.getConnection(async conn => conn);
    } catch (err) {
      throw err;
    }
  }

  async querySingle(queryList, queryPathList) {
    const connection = await this.init(queryPathList);

    const format = { language: "sql", indent: "  " };

    const query = mybatisMapper.getStatement(
      queryList.namespace,
      queryList.sqlId,
      queryList.param,
      format
    );

    connection.connect();

    console.log("====================================================");
    console.log(`= sql [${queryList.namespace}/${queryList.sqlId}]`);
    console.log(`${query}`);
    console.log("====================================================");

    const result = connection.query(query, function (err, results) {
      if (err) throw error;
      console.log("User info is: ", results);

      return results;
    });

    return result._results;
  }
}

module.exports = new MysqlManager();
