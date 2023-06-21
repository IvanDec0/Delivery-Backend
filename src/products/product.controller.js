const productService = require('./product.service')
const responses = require('../utils/handleResponses')

const getAll = (req, res) => {
    productService.getAllProducts()
        .then(data => {
            responses.success({
                status: 200,
                data: data,
                message: 'Getting all Products',
                res
            })
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting all Products',
                res
            })
            console.log(err);
        })
}

const getById = (req, res) => {
    const id = req.params.id
    productService.getProductById(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Getting Product with id: ${id}`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    message: `Product with ID: ${id}, not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting the Product',
                res
            })
        })
}

const create = (req, res) => {
    const data = req.body
    if (!Object.keys(data).length) { // si no existen los key, entro al error
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.name
    ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                name: 'string',
                price: 'float',
                categoryId: 'integer'
            }
        })
    } else {
        const response = productService.createProduct(data)
        return res.status(200).json({
            message: 'Product created succesfully',
            product: data
        })
    }
}

const edit = (req, res) => {
    const id = req.params.id
    const data = req.body
    if (!Object.keys(data).length) { // si no existen los key, entro al error
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.name ||
        !data.price ||
        !data.categoryId
    ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                name: 'string',
                price: 'float',
                categoryId: 'integer'
            }
        })
    } else {
        const response = productService.editProduct( data)
        return res.status(200).json({
            message: 'Product edited succesfully',
            product: data
        })
    }
}

const remove = (req, res) => {
    const id = req.params.id

    productService.deleteProduct(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Product with id: ${id} deleted successfully`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    data: err,
                    message: `The Product with ID ${id} not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: `Error ocurred trying to delete Product with id ${id}`,
                res
            })
        })
}

module.exports = {
    getAll,
    getById,
    create,
    edit,
    remove
}