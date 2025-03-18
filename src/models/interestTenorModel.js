const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const InterestTenor = sequelize.define('InterestTenor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tenor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    interest: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'interest_tenor',
    timestamps: false
})

module.exports = InterestTenor;