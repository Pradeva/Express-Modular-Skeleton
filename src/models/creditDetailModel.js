const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CreditDetail = sequelize.define('CreditDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    period: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    interest_rate: {
        type: DataTypes.NUMERIC(15, 2),
        allowNull: false,
    },
    total_interest: {
        type: DataTypes.NUMERIC(15, 2),
        allowNull: false,
    },
    down_payment: {
        type: DataTypes.NUMERIC(15, 2),
        allowNull: false,
    },
    loan_amount: {
        type: DataTypes.NUMERIC(15, 2),
        allowNull: false,
    },
    monthly_payment: {
        type: DataTypes.NUMERIC(15, 2),
        allowNull: false,
    },
}, {
    tableName: 'credit_detail',
    timestamps: false
});

module.exports = CreditDetail;
