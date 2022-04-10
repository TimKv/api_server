const express = require('express')
const router = express.Router()

// 挂载路由

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')


// 获取搜索的用户基本信息
router.post('/getUsersOne',userinfo_handler.getUsersOne)
// 分页获取用户基本信息的路由
router.post('/pageuser',userinfo_handler.getpageuser)
// 获取所有用户基本信息的路由
router.get('/users',userinfo_handler.getUsers)
// 获取当前用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)
// 更新用户信息的路由
router.post('/userinfo',  userinfo_handler.updateUserInfo)
// 根据id更新用户信息的路由
router.post('/userinfoid/:id',  userinfo_handler.updateUserId)
// 根据id查看用户信息的路由
router.get('/userinfoid/:id',  userinfo_handler.getdateUserId)
// 根据id查看用户信息的路由,包括权限
router.get('/userinfoidroles/:id',  userinfo_handler.getdateUserIdroles)
// 根据id删除用户信息的路由
router.get('/deleteuserinfoid/:id',  userinfo_handler.deletedateUserId)
// 更新密码的路由
router.post('/updatepwd',  userinfo_handler.updatePassword)
// 更换头像的路由
router.post('/update/avatar',  userinfo_handler.updateAvatar)
// 获取头像的路由
router.get('/update/avatar',  userinfo_handler.getdateAvatar)
// 修改用户头像新路由
router.post('/update/avatars',  userinfo_handler.setdateAvatar)

module.exports = router


