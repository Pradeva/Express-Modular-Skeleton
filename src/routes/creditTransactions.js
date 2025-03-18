const express = require('express');
const router = express.Router();
const {getAllCreditTransactions, getCreditTransactionById, getCreditTransactionsByUserId, createCreditTransaction, simulation, getCreditTransactionsOnGoingHistoryById} = require('../controllers/creditTransactionController');

router.get('/',getAllCreditTransactions);
router.get('/:id', getCreditTransactionById);
router.get('/user/:userId', getCreditTransactionsByUserId);
router.post('/', createCreditTransaction);
router.put('/simulation', simulation);
router.get('/user/:userId/:statusType', getCreditTransactionsOnGoingHistoryById);


module.exports = router;