const express = require('express');
const router = express.Router();
const {getInterestTenor, getInterestTenorById} = require('../controllers/interestTenorController');

router.get('/', getInterestTenor);
router.get('/:id', getInterestTenorById);

module.exports = router;