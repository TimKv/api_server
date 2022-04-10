// 导入数据库操作模块
const db = require('../db/index')

// 访问用户权限列表的函数
exports.rolesList = (req, res) => {
    const sql = `select * from ev_roles`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        // 用户信息获取成功
        res.send({
            status: 0,
            message: '获取所有权限信息成功！',
            data: results,
        })
    })
}