const {
    getAllCreditTransactions,
    getCreditTransactionById,
    getCreditTransactionsByUserId,
    createCreditTransaction,
    creditTransactionSimulation,
    getAllCreditTransactionsOnGoingHistory
} = require('../services/creditTransactionService');

const logger = require('../utils/logger');

exports.getAllCreditTransactions = async (req, res) => {
    try {
        const transactions = await getAllCreditTransactions();
        res.json(transactions);
    } catch (error) {
        logger.error('Error in getAllCreditTransactions controller', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getCreditTransactionsOnGoingHistoryById = async (req, res) => {
    try {
        const { userId, statusType } = req.params; // Ambil parameter dari URL
        if (!userId || !statusType) {
            return res.status(400).json({ message: 'User ID and status type are required' });
        }
        const transaction = await getAllCreditTransactionsOnGoingHistory(userId, statusType);
        res.json(transaction);
    } catch (error) {
        logger.error('Error in getCreditTransactionById controller', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.getCreditTransactionById = async (req, res) => {
    try {
        const transaction = await getCreditTransactionById(req.params.id);
        if (transaction) {
            res.json(transaction);
        } else {
            res.status(404).send({ message: 'Credit transaction not found' });
        }
    } catch (error) {
        logger.error('Error in getCreditTransactionById controller', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getCreditTransactionsByUserId = async (req, res) => {
    try {
        const transactions = await getCreditTransactionsByUserId(req.params.userId);
        res.json(transactions);
    } catch (error) {
        logger.error('Error in getCreditTransactionsByUserId controller', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.createCreditTransaction = async (req, res) => {
    try {
        const newTransaction = await createCreditTransaction(req.body);
        res.status(201).json(newTransaction);
    } catch (error) {
        logger.error('Error in createCreditTransaction controller', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.simulation = async (req, res) => {
    try {
        const simulation = await creditTransactionSimulation(req.body);
        res.status(200).json(simulation);
    } catch (error) {
        logger.error('Error in creditTransactionSimulation controller', error);
        res.status(500).send('Internal Server Error');
    }
}
