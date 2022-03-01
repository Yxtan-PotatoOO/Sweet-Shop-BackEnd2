const sql = require('mysql')

// 连接数据库
const client = sql.createConnection({
  host: "127.0.0.1",
  user: "sql_127_0_0_1",
  password: "mRXZy5R5PfeNz6DB",
  database: "sql_127_0_0_1"
})

// 封装数据库操作语句
// callback成功返回结果
function sqlFun(sql, arr, callback) {
  client.query(sql, arr, function(error, result) {
    if (error) {
      console.log('语句错误');
      // console.log(error);
      return;
    }
    callback(result);
  })
}

module.exports = sqlFun;
