const express = require("express")
const router = express.Router()
const store_handler = require('../router_handler/order')


// 获取订单所有数据
router.get('/allorderlist',store_handler.getOrderList)
// 分页获取订单
router.post('/getpageorder',store_handler.getPageOrder)
// 指定id删除订单
router.get('/deleteorder/:id',store_handler.deleteOrder)

// 暴露接口
module.exports = router