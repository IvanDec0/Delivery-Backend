const router = require('express').Router()
const categoryController = require('./category.controller')

const passportJwt = require('../middleware/auth.middleware')

router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getById)
router.post('/',passportJwt, categoryController.create)
router.patch('/:id',passportJwt, categoryController.edit)
router.delete('/:id',passportJwt, categoryController.remove)

module.exports = {router}
