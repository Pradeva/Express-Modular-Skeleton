const { getAllUsers, getUserById, createUser, updateUser, deleteUser, login } = require('../services/usersService');
const logger = require('../utils/logger');

// Mendapatkan semua pengguna
exports.getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    logger.error('Error in getUsers controller', error);
    res.status(500).send('Internal Server Error');
  }
};

// Mendapatkan pengguna berdasarkan ID
exports.getUserById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    logger.error('Error in getUserById controller', error);
    res.status(500).send('Internal Server Error');
  }
};

// Menambahkan pengguna baru
exports.createUser = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('Error in createUser controller', error);
    res.status(400).json({ message: error.message });
  }
};

// Mengupdate data pengguna
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    logger.error('Error in updateUser controller', error);
    res.status(500).send('Internal Server Error');
  }
};

// Menghapus pengguna
exports.deleteUser = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.json(result);
  } catch (error) {
    logger.error('Error in deleteUser controller', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const {user} = await login(email, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    logger.error('Error in loginUser controller', error);
    res.status(401).json({ message: error.message });
  }
};
