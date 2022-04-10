// 导入数据库操作模块
const db = require('../db/index')

// 导入处理图片相关模块
const multiparty = require('multiparty')
const config = require('../config')

const path = require('path')
const fs = require('fs')
const { result } = require('@hapi/joi/lib/base')

exports.getOrderList = (req, res) => {
    const sql = `select * from orderlist`
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        const reslen = result.length
        res.send({
            status: 0,
            message: `获取成功`,
            data: result,
            reslen:reslen
        })
    })
}

exports.getPageOrder = (req, res) => {
    const sql = `select * from orderlist limit ?,?`
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

exports.deleteOrder = (req,res)=>{
    const sql = `delete from orderlist where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除失败！')
        res.cc('删除成功！', 0)
    })
}