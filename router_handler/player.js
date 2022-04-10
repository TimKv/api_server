// 导入数据库操作模块
const db = require('../db/index')
// 导入全局的配置文件
const config = require('../config')
// 导入处理图片相关模块
const multiparty = require('multiparty')

const path = require('path')
const fs = require('fs')

exports.playerData = (req, res) => {
  const sql = `select * from users where id=?`
  db.query(sql, req.user.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (results.length !== 1) return res.cc('获取用户信息失败！')

    // 用户信息获取成功
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results[0],
    })
  })
}

// 修改用户密码路由函数
exports.updataPass = (req, res) => {
  const sql = `update users set password=? where id=?`
  db.query(sql, [req.body.newpassword, req.user.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 判断影响的行数
    if (results.affectedRows !== 1) return res.cc('更新密码失败！')
    // 成功
    res.cc('更新密码成功', 0)
  })
}

// 修改头像的函数
exports.setAvatar = (req, res) => {
  // 获取时间戳
  var timestamp = Date.parse(new Date());
  const form = new multiparty.Form()
  // 指定上传路径
  form.uploadDir = config.admPIcPath
  // 设置头像大小2m
  form.maxFilesSize = 2 * 1024 * 1024

  form.parse(req, function (err, fields, files) {
    if (err) return res.cc(err)
    console.log(req);

    // 当前上传头像信息
    const picFile = files.img[0]
    // 头像后缀
    const picExtname = path.extname(picFile.originalFilename)
    // 图片名，id+后缀名
    const newPicName = timestamp + picExtname
    // 图片旧地址
    const oldPicPath = picFile.path
    //新地址
    const newPicPath = form.uploadDir + '\\' + newPicName

    // 重命名为真实文件名
    fs.rename(oldPicPath, newPicPath, (err) => {
      if (err) {
        console.log('修改失败');
      } else {
        console.log('成功');
      }
    })

    // 更新用户头像地址
    let sql = `update users set user_pic=? where id=?`
    db.query(sql, [newPicName, req.user.id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows) return res.cc('头像更新成功', 0)
    })
  })

}

exports.updataPlayer = (req, res) => {
  // 定义待执行的 SQL 语句
  // console.log(req.body);
  const sql = `update users set ? where id=?`
  // 调用 db.query() 执行 SQL 语句并传递参数
  db.query(sql, [req.body, req.user.id], (err, results) => {
    // 执行 SQL 语句失败
    console.log(req.body);
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
    // 成功
    res.cc('更新用户信息成功！', 0)
  })
}

exports.getGameData = (req,res)=>{
  const sql = `select * from goodslist where id = ?` 
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (results.length !== 1) return res.cc('获取游戏信息失败！')

    // 用户信息获取成功
    res.send({
      status: 0,
      message: '获取游戏信息成功！',
      data: results[0],
    })
  })
}

exports.setUserGame = (req,res)=>{
  const sql = `update users set ? where id=?`
    // console.log(req.body);
    // const id = Number(req.params.id)
    db.query(sql, [req.body, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
        // 成功
        res.cc('更新用户信息成功！', 0)
    })
}
