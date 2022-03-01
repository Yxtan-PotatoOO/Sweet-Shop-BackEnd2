// 搭建Express服务器
const express = require('express');
const app = express();
// 使用req.body必须要有
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

// 使用路由
const router = require('./router')
// 设定前面要加/api，
app.use('/api', router)

// 监听端口
// 端口随便写，不要冲突就行
// http://localhost:8989/api
app.listen(8989, ()=>{
  console.log('success listen at port:8989......');
});
