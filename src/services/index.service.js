const mysqlManager = require("../mysql/mysql");
const path = require("path");
const queryPathList = path.join(__dirname, "mybatis");

class IndexService {
  constructor() {}

  async getDevices() {
    const query = {
      namespace: "devices",
      sqlId: "getDevicesAll",
      param: {},
    };

    const results = await mysqlManager.querySingle(query, queryPathList);

    return results;
  }
}

module.exports = new IndexService();
