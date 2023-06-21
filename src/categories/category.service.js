const uuid = require('uuid');
const Categories = require('../models/category.model')

const getAllCategories = async () => {
    const data = await Categories.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    })
    return data
}

const getCategoryById = async (id) => {
    const data = await Categories.findOne({
        where: { id: id }
    })
    return data
}

const createCategory = async (data) => {
    const newCategory = await Categories.create({
        id: uuid.v4(),
        name: data.name
    })
    return newCategory
}

const editCategory = async (categoryId, data) => {
    const response = await Categories.update(data, {
        where: { id: categoryId }
    })
    return response
}

const deleteCategory = async (id) =>{
    const data = await Categories.destroy({
        where: {
            id: id
        }
    })
    return data
}

const getCategoryByName = async (name) =>{
    const data = await Categories.findOne({
        where: {
            name: name
        }
    })
    return data
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    createCategory,
    editCategory,
    deleteCategory
}