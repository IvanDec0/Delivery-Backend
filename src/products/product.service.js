const uuid = require('uuid');
const Products = require('../models/product.model')

const getAllProducts = async () => {
    const data = await Products.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })
    return data
}

const getProductById = async (id) => {
    const data = await Products.findOne({
        where: { id: id }
    })
    return data
}

const createProduct = async (data) => {
    const newCategory = await Products.create({
        id: uuid.v4(),
        name: data.name,
        price: data.price,
        categoryId: data.categoryId
    })
    return newProduct
}

const editProduct = async (productId, data) => {
    const response = await Products.update(data, {
        where: { id: productId }
    })
    return response
}

const deleteProduct = async (id) =>{
    const data = await Products.destroy({
        where: {
            id: id
        }
    })
    return data
}

const getProductByName = async (name) =>{
    const data = await Products.findOne({
        where: {
            name: name
        }
    })
    return data
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductByName,
    createProduct,
    editProduct,
    deleteProduct
}