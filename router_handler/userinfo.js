// 导入数据库操作模块
const db = require('../db/index')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')
// 导入处理图片相关模块
const multiparty = require('multiparty')
const config = require('../config')

const path = require('path')
const fs = require('fs')


// delete from emp where id=3
// 根据id删除用户信息的处理函数
exports.deletedateUserId = (req, res) => {
  // 在删除前定以当前token的用户是否有删除权限，通过token生成的user中查找
  const sql_roles = `select roles from ev_users where id = ?`
  db.query(sql_roles, req.user.id, (err, resultss) => {
    if (err) return res.cc(err)
    // console.log(results[0].roles);
    // 将获取的数据转换为数组
    const reslist = resultss[0].roles.split(',')
    console.log(reslist);
    if (reslist.indexOf('101') > -1) {
      console.log(reslist.indexOf('101'));
      // res.cc('stop')

      // 定义标记删除的 SQL 语句
      const sql = `delete from ev_users where id=?`
      // 调用 db.query() 执行 SQL 语句
      db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除用户失败！')
        res.cc('删除用户成功！', 0)
      })

    } else {
      res.cc('你没有此接口权限')
    }
  })

}

// 获取所有用户基本信息的处理函数
exports.getUsers = (req, res) => {
  const sql = `select * from ev_users`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    console.log(results);
    // 用户信息获取成功
    res.send({
      status: 0,
      message: '获取所有用户信息成功！',
      data: results,
    })
  })
}


// 获取搜索的用户基本信息的处理函数
exports.getUsersOne = (req, res) => {
  console.log(req.body);
  const sql = `select * from ev_users where username=?`
  db.query(sql, req.body.username, (err, results) => {
    if (err) return res.cc(err)
    // 用户信息获取成功

    res.send({
      status: 0,
      message: `获取${req.body.query}信息成功！`,
      data: results,
    })
  })
}



// 获取分页用户基本信息的处理函数
exports.getpageuser = (req, res) => {
  const sqls = `select * from ev_users`
  db.query(sqls, (err, resultss) => {
    const resLen = resultss.length
    const sql = `select * from ev_users limit ?,?`
    const a = [Number(req.body.pagenum), Number(req.body.pagesize)]
    console.log(req.body);
    db.query(sql, a, (err, results) => {
      if (err) return res.cc(err)

      res.send({
        status: 0,
        message: `获取${Number(req.body.pagenum) + 1}页面${req.body.pagesize}个用户信息成功！`,
        data: results,
        reslen: resLen
      })
    })
  })
}



// 获取当前用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  // 定义查询用户信息的 SQL 语句
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
  // 调用 db.query() 执行 SQL 语句
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

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  // 定义待执行的 SQL 语句
  // console.log(req.body);
  const sql = `update ev_users set ? where id=?`
  // 调用 db.query() 执行 SQL 语句并传递参数
  db.query(sql, [req.body, req.user.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
    // 成功
    res.cc('更新用户信息成功！', 0)
  })
}

// 根据id更新用户基本信息的处理函数
exports.updateUserId = (req, res) => {
  // 在修改前定以当前token的用户是否有删除权限，通过token生成的user中查找
  const sql_roles = `select roles from ev_users where id = ?`
  db.query(sql_roles, req.user.id, (err, resultss) => {
    if (err) return res.cc(err)
    // console.log(results[0].roles);
    // 将获取的数据转换为数组
    const reslist = resultss[0].roles.split(',')
    // console.log(reslist);
    if (reslist.indexOf('100') > -1) {
      // console.log(reslist.indexOf('deleteUser'));
      // res.cc('stop')

      // 定义修改待执行的 SQL 语句
      const sql = `update ev_users set ? where id=?`
      // 调用 db.query() 执行 SQL 语句并传递参数
      db.query(sql, [req.body, req.params.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
        // 成功
        res.cc('更新用户信息成功！', 0)
      })



    } else {
      res.cc('你没有此接口权限')
    }
  })

}
// 根据id查询用户基本信息的处理函数
exports.getdateUserId = (req, res) => {
  // 定义查询用户信息的 SQL 语句
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.params.id, (err, results) => {
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

// 根据id查询用户基本信息包括权限的处理函数
exports.getdateUserIdroles = (req, res) => {
  // 定义查询用户信息的 SQL 语句
  const sql = `select id, username, nickname, email, user_pic,roles from ev_users where id=?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.params.id, (err, results) => {
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

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
  // 根据 id 查询用户的信息
  const sql = `select * from ev_users where id=?`
  // 执行根据 id 查询用户的信息的 SQL 语句
  db.query(sql, req.user.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 判断结果是否存在
    if (results.length !== 1) return res.cc('用户不存在！')

    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('旧密码错误！')

    // 定义更新密码的 SQL 语句
    const sql = `update ev_users set password=? where id=?`
    // 对新密码进行加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 判断影响的行数
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')
      // 成功
      res.cc('更新密码成功', 0)
    })
  })
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  // 1. 定义更新头像的 SQL 语句
  // console.log(req);
  const sql = `update ev_users set user_pic=? where id=?`
  // 2. 调用 db.query() 执行 SQL 语句
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 影响的行数是否等于 1
    if (results.affectedRows !== 1) return res.cc('更换头像失败！')
    // 成功
    res.cc('更换头像成功！', 0)
  })
}

exports.getdateAvatar = (req,res)=>{
  const sql = `select user_pic from ev_users where id=?`
  db.query(sql,req.user.id,(err,results)=>{
    if (err) return res.cc(err)
    // 影响的行数是否等于 1
    if (results.length !== 1) return res.cc('获取头像失败！')
    // 成功
    res.send({
      status: 0,
      message: '获取头像信息成功！',
      data: results[0],
    })
  })

}

exports.setdateAvatar=(req,res)=>{
  // 获取时间戳
  var timestamp = Date.parse(new Date());
  const form = new multiparty.Form()
  // 指定上传路径
  form.uploadDir = config.admPIcPath
  // 设置头像大小2m
  form.maxFilesSize = 2 * 1024 *1024

  form.parse(req,function(err,fields,files){
    if(err) return res.cc(err)
    console.log(req);

    // 当前上传头像信息
    const picFile = files.img[0]
    // 头像后缀
    const picExtname = path.extname(picFile.originalFilename)
    // 图片名，id+后缀名
    const newPicName = timestamp+picExtname
    // 图片旧地址
    const oldPicPath = picFile.path
    //新地址
    const newPicPath = form.uploadDir +'\\' +newPicName

    // 重命名为真实文件名
    fs.rename(oldPicPath,newPicPath,(err)=>{
      if(err){
        console.log('修改失败');
      }else{
        console.log('成功');
      }
    })
    
    // 更新用户头像地址
    let sql = `update ev_users set user_pic=? where id=?`
    db.query(sql,[newPicName,req.user.id],(err,results)=>{
      if(err) return res.cc(err)
      if(results.affectedRows) return res.cc('头像更新成功',0)
    })
  })
  
}
