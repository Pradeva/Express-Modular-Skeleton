const express = require('express');
const router = express.Router();
const { getCars, getCar, createCar, updateCar, deleteCar, getCarUserId } = require('../controllers/carsController');
// const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', getCars);
router.get('/:id', getCar);
router.get('/user/:id', getCarUserId)
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
