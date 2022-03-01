const express = require('express');
const router = express.Router();

// 导入jsonwebtoken
const jwt = require('jsonwebtoken');
// config.jwtSecret
const config = require('./secret.js')

// 导入数据库
// sqlFun("sql语句", [数组], res=>{返回结果的箭头函数})
const sqlFun = require('./mysql')

// 路由接口，测试用
// router.get('/',(req, res)=>{
//   res.send('hello')
// })


// 真实的接口
// 显示系统信息接口
// page是页码
// {total:'', arr:[{},{}], pagesize:8}
router.get('/sysInfoList', (req, res) => {
  const page = req.query.page || 1;
  const sqlLen = "select * from tb_SysInfo where id"
  sqlFun(sqlLen, null, data => {
    let len = data.length;
    const sql = "select * from tb_SysInfo order by id desc limit 8 offset " + (page - 1) * 8;
    sqlFun(sql, null, (result) => {
      if (result.length > 0) {
        res.send({
          status: 200,
          data: result,
          pageSize: 8,
          total: len
        })
      } else {
        res.send({
          status: 500,
          msg: "No Data"
        })
      }
    })
  })
})

// 查询系统信息接口
router.get('/searchSysInfo', (req, res) => {
  var searchSysInfo = req.query.search;
  const sql = "SELECT * from tb_SysInfo where concat(`SerTitle`, `SerContent`) like '%" + searchSysInfo + "%'";
  sqlFun(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        data: result
      })
    } else {
      res.send({
        status: 500,
        msg: "No Data"
      })
    }
  })
})

// 删除条目
router.get("/backend/deleteItem",(req, res)=>{
  var id = req.query.id;
  const sql = "delete from tb_SysInfo where id =?"
  const arr = [id];
  sqlFun(sql, arr, result=>{
    if(result.affectedRows > 0){
      res.send({
          status: 200,
          msg: "删除成功"
        })
      } else {
        res.send({
          status: 500,
          msg: "删除失败"
        })
    }
  })
})

// 添加条目
router.get("/backend/addItem",(req, res)=>{
  var usrID = req.query.usrID || "";
  var SerTitle = req.query.SerTitle || "";
  var SerContent = req.query.SerContent || "";
  var adminID = req.query.adminID || "";
  const sql = "INSERT INTO tb_sysinfo(usrID,SerTitle,SerContent,SerDateTime,adminID) VALUES (?,?,?,now(),?)"
  const arr = [usrID, SerTitle, SerContent, adminID];
  sqlFun(sql, arr, result=>{
    if(result.affectedRows > 0){
      res.send({
          status: 200,
          msg: "删除成功"
        })
      } else {
        res.send({
          status: 500,
          msg: "删除失败"
        })
    }
  })
})

// 标题选择
/*
表单结构
mid --- ai
id
name
cid
1, 1, 家用电器, 1001
2, 1, 手机, 1002
3, 1001, A, 10001
*/
router.get('/backend/selectTitle', (req, res) => {
  const id = req.query.id || 1
  const sql = "SELECT * from category where id=?";
  var arr = [id]
  sqlFun(sql, arr, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        data: result
      })
    } else {
      res.send({
        status: 500,
        msg: "No Data"
      })
    }
  })
})

// 标题结构
router.get('/backend/selectTitleTree', (req, res) => {
  const id = req.query.id || 1;
  const sql = "SELECT * from params where id=?";
  var arr =[id];
  sqlFun(sql, arr, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        data: result
      })
    } else {
      res.send({
        status: 500,
        msg: "No Data"
      })
    }
  })
})

// 登录接口
/*
Expiration --- 过期时间
jwt.sign({},'密钥','过期时间,{expiresIn：20*1,'1day''1h}')
*/
// 需要导入模块 jsonwebtoken 密钥
// req.body处理post，需要载入中间件
// var bodyParser = require('body-parser');
router.post('/login', (req, res) => {
  let{
	  adminID,
	  adminPwd
  } = req.body
  const sql = "SELECT * from tb_Admin where adminID=? and adminPwd=? ";
  var arr =[adminID,adminPwd];
  sqlFun(sql, arr, (result) => {
    if (result.length > 0) {
      let token = jwt.sign({
        adminID:result[0].adminID,
        id:result[0].id
      },config.jwtSecret,{
        expiresIn: 20*1
      })
      res.send({
        status: 200,
        data: token
      })
    } else {
      res.send({
        status: 404,
        msg: "信息错误"
      })
    }
  })
})





module.exports = router;
