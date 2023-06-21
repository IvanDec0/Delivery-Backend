const router = require('express').Router()
const userController = require('./user.controller')

const passportJwt = require('../middleware/auth.middleware')

router.get('/', userController.getAll)

router.get('/me', passportJwt, userController.getMyUserById)
router.patch('/me', passportJwt, userController.editMyuser)
router.delete('/me', passportJwt, userController.removeMyUser)

router.get('/:id', passportJwt, userController.getById)
router.patch('/:id',passportJwt, userController.edit)
router.delete('/:id',passportJwt, userController.remove)

module.exports = {router}
