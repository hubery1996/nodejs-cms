var mysql = require('mysql');
var pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'cms'
});
// 模块公开接口
module.exports = {
    mysql,
    pool
}