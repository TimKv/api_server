// 导入数据库操作模块
const db = require('../db/index')

// 导入处理图片相关模块
const multiparty = require('multiparty')
const config = require('../config')

const path = require('path')
const fs = require('fs')

var md5 = require('md5-js');




// 显示所有商品的函数
exports.getAllGoods = (req, res) => {
    // console.log(md5('hellow world'),'md5');
    const sql = `select * from goodslist`
    db.query(sql, (err, results) => {
        const reslen = results.length
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '商品',
            data: results,
            reslen: reslen
        })
    })
}

// 通过对应id获取二级分类名称的函数
exports.getTwoSort = (req, res) => {
    // console.log(req.body);
    const sql = `select two_name from twotage where id=?`
    db.query(sql, req.body.id, (err, result) => {
        if (err) return res.cc(err)
        console.log(req.body);
        // 用户信息获取成功
        res.send({
            status: 0,
            message: '获取二级标题成功',
            data: result
        })
    })
}

// 根据分页获取信息
exports.getPageList = (req, res) => {
    const sql = `select * from goodslist limit ?,?`
    const a = [Number(req.body.pagenum), Number(req.body.pagesize)]
    db.query(sql, a, (err, results) => {
        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: `获取${Number(req.body.pagenum) + 1}页面${req.body.pagesize}个用户信息成功！`,
            data: results
        })
    })
}
// 搜索
exports.getGoodsOne = (req, res) => {

    // console.log(req.body);console.log
    const sql = `select * from goodslist where goods_name=?`
    db.query(sql, req.body.goodsname, (err, results) => {
        if (err) return res.cc(err)
        // 信息获取成功

        res.send({
            status: 0,
            message: `获取信息成功！`,
            data: results,
        })
    })
}

// 添加
exports.insertGoods = (req, res) => {
    const goodsinfo = req.body
    // 定义 SQL 语句，查询游戏名是否被占用
    const sqlStr = 'select * from goodslist where goods_name=?'
    db.query(sqlStr, goodsinfo.goods_name, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            return res.cc('用户名被占用，请更换其他用户名！')
        }

        const sql = 'insert into goodslist set ?'
        db.query(sql, goodsinfo, (err, results) => {

            if (err) return res.cc(err)
            // 判断影响行数是否为 1
            // if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            if (results.affectedRows !== 1) return res.cc('添加失败，请稍后再试！')
            // 注册用户成功
            // res.send({ status: 0, message: '注册成功！' })
            res.cc('添加成功！', 0)
        })

    })
}

// 删除
exports.deleteGoods = (req, res) => {
    const sql = `delete from goodslist where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除失败！')
        res.cc('删除成功！', 0)
    })
}

// 根据id获取游戏
exports.getGoodById = (req, res) => {
    const sql = `select * from goodslist where id = ?`
    db.query(sql, req.params.id, (err, results) => {
        // console.log(req.params.id);
        if (err) return res.cc(err)
        // console.log(results);
        res.send({
            status: 0,
            message: '获取成功',
            data: results
        })
    })
}
// 根据id修改游戏
exports.reGoodsId = (req, res) => {
    const sql = `update goodslist set ? where id=?`
    // console.log(req.body);
    // const id = Number(req.params.id)
    db.query(sql, [req.body, req.params.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
        // 成功
        res.cc('更新用户信息成功！', 0)
    })
}

// 根据id修改图片
exports.updataAvatarsId = (req, res) => {
    // 获取时间戳
    var timestamp = Date.parse(new Date());
    const form = new multiparty.Form()
    // 指定上传路径
    form.uploadDir = config.admPIcPath
    // 设置头像大小2m
    form.maxFilesSize = 2 * 1024 * 1024

    form.parse(req, function (err, fields, files) {
        if (err) return res.cc(err)
        // console.log(req);

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
        let sql = `update goodslist set goods_pic=? where id=?`
        console.log(req.params.id, '更改头像');
        db.query(sql, [newPicName, req.params.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows) return res.cc('头像更新成功', 0)
        })
    })

}

// 根据一级标题获取二级标题
exports.oneGetTow = (req, res) => {
    const sql = `select detail from twotage where one_id = ?`
    const OneList = []
    db.query(sql, req.body.one_id, (err, results) => {
        if (err) return res.cc(err)
        for (let i = 0; i < results.length; i++) {
            OneList.push(results[i].detail)
        }
        // console.log(OneList);

        res.send({
            status: 0,
            message: `获取信息成功！`,
            data: OneList,
        })
    })
}

// 获取所有一级分类
exports.getOneStage = (req, res) => {
    const OneList = []
    const sql = `select detail from onetage`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        for (let i = 0; i < results.length; i++) {
            OneList.push(results[i].detail)
        }

        res.send({
            status: 0,
            message: `获取信息成功！`,
            data: OneList,
        })
    })
}

// 获取所有id的函数
exports.getAllId = (req, res) => {
    const sql = `select id from goodslist`
    db.query(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        const arrynum = [...results]
        const arry = []
        for (let i = 0; i < arrynum.length; i++) {
            arry.push(String(arrynum[i].id))
        }
        // 用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: arry,
        })
    })
}

exports.getGameId = (req, res) => {
    const sql = `select id from goodslist limit ?,?`
    const a = [Number(req.body.pagenum), Number(req.body.pagesize)]
    db.query(sql, a, (err, results) => {
        if (err) return res.cc(err)
        

        // 将id转换为字符串装进数组
        const arrynum = [...results]
        const arry = []
        for (let i = 0; i < arrynum.length; i++) {
            arry.push(String(arrynum[i].id))
        }
        console.log(arry);
        res.send({
            status: 0,
            message: `获取${Number(req.body.pagenum) + 1}页面${req.body.pagesize}个用户信息成功！`,
            data: arry
        })
    })
}

exports.getGameName = (req,res)=>{
    const sql = `select id from goodslist where goods_name=?`
    db.query(sql,req.body.goods_name,(err,results)=>{
        if (err) return res.cc(err)
        // console.log(,'results');
        res.send({
            status: 0,
            message: `获取信息成功！`,
            data: results[0].id
        })

    })
}