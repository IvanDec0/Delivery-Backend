// const Usuarios = require('./user.model')
// const Roles = require('./roles.model')
const Categories = require('./category.model')
const Products = require('./product.model')

const initModel = () => {

    // //?Usuarios <- Roles
    // Roles.hasMany(Usuarios)
    // Usuarios.belongsTo(Roles)
    Categories.hasMany(Products)
    Products.belongsTo(Categories)
}

module.exports = initModel;