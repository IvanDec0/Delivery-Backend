const {DataTypes} = require('sequelize')
const db  = require('../utils/database');

const Orders = db.define('orders', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    orderStatus: {
        type: DataTypes.STRING,
        default: "Not Processed",
        enum: [
          "Not Processed",
          "Cash on Delivery",
          "Processing",
          "Dispatched",
          "Cancelled",
          "Delivered",
        ],
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

Orders.associate = (models) => {
    Orders.User = Orders.belongsTo(models.Users, {
      as: "orderby",
      foreignKey: "userId",
    });
}

module.exports = 
Orders
