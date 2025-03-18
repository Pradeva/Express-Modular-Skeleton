const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const logger = require('../utils/logger');

// Mendapatkan semua pengguna
exports.getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    }); // Mengambil semua pengguna
    logger.info(`Fetched ${users.length} users`);
    return users
  } catch (error) {
    logger.error('Error fetching users', error);
    throw new Error('Error fetching users');
  }
};

// Mendapatkan pengguna berdasarkan ID
exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    }); // Mencari pengguna berdasarkan ID
    logger.info(`Fetched user ${id} `);
    return user;
  } catch (error) {
    logger.error('Error fetching user by id', error);
    throw new Error('Error fetching user by id');
  }
};

// Menambahkan pengguna baru
exports.createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    logger.info(`User ${newUser.name} created successfully`);
    return newUser;
  } catch (error) {
    logger.error('Error creating user', error);
    throw new Error('Error creating user');
  }
};

// Mengupdate data pengguna
exports.updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(userData);
      logger.info(`User ${user.id} created successfully`);
      return user;
    }
    throw new Error('User not found');
  } catch (error) {
    logger.error('Error updating user', error);
    throw new Error('Error updating user');
  }
};

// Menghapus pengguna
exports.deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      logger.info(`User ${id} deleted successfully`);
      return { message: 'User deleted successfully' };
    }
    throw new Error('User not found');
  } catch (error) {
    logger.error('Error deleting user', error);
    throw new Error('Error deleting user');
  }
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

exports.login = async (email, password) => {
  const user = await this.findUserByEmail(email);
  if (!user) {
    throw new Error('Email not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Generate JWT token
  // const token = generateToken({ id: user.id, email: user.email });
  return {user: { id: user.id, name: user.name, email: user.email } };
};
