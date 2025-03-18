const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');
const Car = require('./carModel');
const StatusCreditTransaction = require('./statusCreditTransactionModel');
const CreditDetail = require('./creditDetailModel');
const InterestTenor = require('./interestTenorModel');

const CreditTransaction = sequelize.define('CreditTransaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Car,
            key: 'id',
        },
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: StatusCreditTransaction,
            key: 'id',
        },
    },
    interest_tenor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: InterestTenor,
            key: 'id',
        },
    },
    detail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CreditDetail,
            key: 'id',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'r_credit_transaction',
    timestamps: false, // Sequelize otomatis mengelola createdAt & updatedAt
    underscored: true, // Menggunakan snake_case untuk kolom
});

CreditTransaction.belongsTo(User, {foreignKey: 'user_id'})
CreditTransaction.belongsTo(Car, {foreignKey: 'car_id'})
CreditTransaction.belongsTo(InterestTenor, {foreignKey: 'interest_tenor_id'})
CreditTransaction.belongsTo(StatusCreditTransaction, {foreignKey: 'status_id'})
CreditTransaction.belongsTo(CreditDetail, {foreignKey: 'detail_id'})
User.hasMany(CreditTransaction, {foreignKey: 'user_id'})
Car.hasMany(CreditTransaction, {foreignKey: 'car_id'})
InterestTenor.hasMany(CreditTransaction, {foreignKey: 'interest_tenor_id'})
StatusCreditTransaction.hasMany(CreditTransaction, {foreignKey: 'status_id'})
CreditDetail.hasMany(CreditTransaction, {foreignKey: 'detail_id'})


module.exports = CreditTransaction;
