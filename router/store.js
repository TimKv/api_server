const express = require("express")
const router = express.Router()
const store_handler = require('../router_handler/store')

// 导入商品路由处理函数对应的模块

// 获取所有商品信息
router.get('/storegoods',store_handler.getAllGoods)
// 通过对应id获取二级分类名称
router.post('/gettwosort',store_handler.getTwoSort)
// 同分页获取信息
router.post('/getpagegoods',store_handler.getPageList)
// 搜索游戏
router.post('/getgoods',store_handler.getGoodsOne)
// 添加游戏
router.post('/insertgoods',store_handler.insertGoods)
// 根据id删除游戏
router.get('/goodsinfoid/:id',store_handler.deleteGoods)
// 根据id获取游戏
router.get('/getgoodsid/:id',store_handler.getGoodById)
// 根据id修改游戏
router.post('/regoodsid/:id',store_handler.reGoodsId)
// 修改游戏图片路由
router.post('/updataavatars/:id',store_handler.updataAvatarsId)
// 获取所有一级分类
router.get('/getone',store_handler.getOneStage)
// 根据一级分类查询二级分类
router.post('/onestagetwo',store_handler.oneGetTow)
// 获取所有商品id
router.get('/getallid',store_handler.getAllId)
// 分页获取商品id
router.post('/getgameid',store_handler.getGameId)
// 根据name获取id
router.post('/getgamename',store_handler.getGameName)


// 暴露接口
module.exports = router