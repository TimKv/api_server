const express = require('express')
const router = express.Router()
const roles_handler = require('../router_handler/roles')

// 访问用户权限列表
router.get('/user',roles_handler.rolesList)

module.exports = router
