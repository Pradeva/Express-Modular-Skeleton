const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const statusCreditTransaction = sequelize.define('StatusCreditTransaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'status_credit_transaction',
    timestamps: false
})

module.exports = statusCreditTransaction;