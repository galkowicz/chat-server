const express = require('express')

const mainController = require('../controllers/main')

const router = express.Router()

router.post('/login', mainController.postLogin)

module.exports = router
