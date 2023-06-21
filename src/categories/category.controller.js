const categoryService = require('./category.service')
const responses = require('../utils/handleResponses')

const getAll = (req, res) => {
    categoryService.getAllCategories()
        .then(data => {
            responses.success({
                status: 200,
                data: data,
                message: 'Getting all Categories',
                res
            })
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting all Categories',
                res
            })
            console.log(err);
        })
}

const getById = (req, res) => {
    const id = req.params.id
    categoryService.getCategoryById(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Getting Category with id: ${id}`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    message: `Category with ID: ${id}, not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting the Category',
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
                name: 'string'
            }
        })
    } else {
        const response = categoryService.createCategory(data)
        return res.status(200).json({
            message: 'Category created succesfully',
            category: data
        })
    }
}

const edit = (req, res) => {
    const id = req.params.id
    const data = req.body
    if (!Object.keys(data).length) { // si no existen los key, entro al error
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.name
    ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                name: 'string'
            }
        })
    } else {
        const response = categoryService.editCategory(id, data)
        return res.status(200).json({
            message: 'Category edited succesfully',
            category: data
        })
    }
}

const remove = (req, res) => {
    const id = req.params.id

    categoryService.deleteCategory(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Category with id: ${id} deleted successfully`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    data: err,
                    message: `The Category with ID ${id} not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: `Error ocurred trying to delete Category with id ${id}`,
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