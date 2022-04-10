const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const player_handler = require('../router_handler/player')

// 获取当前用户所有数据
router.get('/playerdata',player_handler.playerData)
// 修改当前用户密码
router.post('/updatapassword',player_handler.updataPass)
// 修改用户头像
router.post('/setavatar',player_handler.setAvatar)
// 修改用户信息
router.post('/updataplayer/:id',player_handler.updataPlayer)
// 根据id获取游戏信息
router.get('/getgamedata/:id',player_handler.getGameData)
// 修改用户的游戏栏
router.post('/setusergame',player_handler.setUserGame)
// 添加订单数据
router.post('/addorderlist',player_handler.addOrderList)

module.exports = router