const {DataTypes} = require('sequelize')
const db  = require('../utils/database')
const Categories = require('./category.model')

const Products = db.define('products', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false
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
});

/* Products.associate = (models) => {
  Products.belongsTo(models.Categories, {
    foreignKey: {
      name: 'categoryId',
      allowNull: false
    },
    as: 'category'
  });
}; */

module.exports = 
Products



