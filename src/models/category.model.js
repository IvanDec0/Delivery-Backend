const {DataTypes} = require('sequelize')
const db  = require('../utils/database');
const Products = require('./product.model');

const Categories = db.define('categories', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'createdAt'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updatedAt'
    }
})

/* Categories.associate = (models) => {
    Categories.hasMany(models.Products, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      },
      as: 'products'
    });
  }; */

module.exports = 
    Categories
