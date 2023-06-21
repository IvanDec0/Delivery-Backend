const router = require('express').Router()
const productController = require('./product.controller')

const passportJwt = require('../middleware/auth.middleware')

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/',passportJwt, productController.create)
router.patch('/:id',passportJwt, productController.edit)
router.delete('/:id',passportJwt, productController.remove)

module.exports = {router}
