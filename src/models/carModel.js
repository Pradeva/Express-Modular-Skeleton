const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Car = sequelize.define('Car', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(15, 2), // Bisa menyimpan hingga 999 miliar
    allowNull: false,
  },
  deleted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW, // Secara default, diisi waktu sekarang
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW, // Secara default, diisi waktu sekarang
  },
}, {
  tableName: 'cars',
  timestamps: true,
});

module.exports = Car;
