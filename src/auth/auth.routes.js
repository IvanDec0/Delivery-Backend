const router = require('express').Router()
const authController = require('./auth.controller')


router.post('/login', authController.login)
router.post('/register', authController.signUp)


module.exports = {router}