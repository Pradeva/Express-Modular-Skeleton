const express = require('express');
const router = express.Router();
const { getCars, getCar, createCar, updateCar, deleteCar, getCarUserId } = require('../controllers/carsController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getCars);
router.get('/:id', authMiddleware, getCar);
router.get('/user/:id', authMiddleware, getCarUserId)
router.post('/', authMiddleware, createCar);
router.put('/:id', authMiddleware, updateCar);
router.delete('/:id', authMiddleware, deleteCar);

module.exports = router;
