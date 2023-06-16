const router = require('express').Router()
const userService = require('./user.http')

const passportJwt = require('../middleware/auth.middleware')

router.get('/', userService.getAll)

router.get('/me', passportJwt, userService.getMyUserById)
router.patch('/me', passportJwt, userService.editMyuser)
router.delete('/me', passportJwt, userService.removeMyUser)

router.get('/:id', passportJwt, userService.getById)
router.patch('/:id',passportJwt, userService.edit)
router.delete('/:id',passportJwt, userService.remove)

module.exports = {router}
