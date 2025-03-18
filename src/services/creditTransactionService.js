const CreditTransaction = require('../models/creditTransactionModel');
const User = require('../models/userModel');
const Car = require('../models/carModel');
const InterestTenor = require('../models/interestTenorModel');
const StatusCreditTransaction = require('../models/statusCreditTransactionModel');
const CreditDetail = require('../models/creditDetailModel');
const logger = require('../utils/logger');

// Mendapatkan semua transaksi kredit
exports.getAllCreditTransactions = async () => {
  try {
    const transactions = await CreditTransaction.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'] // Sesuaikan atribut yang ingin ditampilkan
        },
        {
          model: Car,
          attributes: ['id', 'brand', 'model', 'price'] // Sesuaikan atribut yang ingin ditampilkan
        },
        {
          model: InterestTenor,
          attributes: ['id', 'tenor', 'interest'] // Sesuaikan atribut yang ingin ditampilkan
        },
        {
          model: StatusCreditTransaction,
          attributes: ['id', 'name']
        },
        {
          model: CreditDetail,
          attributes: ['id', 'name', 'period', 'interest_rate', 'total_interest', 'down_payment', 'loan_amount', 'monthly_payment']
        }
      ],
      attributes: { exclude: ['user_id', 'car_id', 'interest_tenor_id', 'status_id', 'detail_id'] } // Menyembunyikan foreign key
    });
    logger.info(`Fetched ${transactions.length} credit transactions`);
    return transactions;
  } catch (error) {
    logger.error('Error fetching credit transactions', error);
    throw new Error('Error fetching credit transactions');
  }
};

// Mendapatkan transaksi kredit berdasarkan ID
exports.getCreditTransactionById = async (id) => {
  try {
    const transaction = await CreditTransaction.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'] // Sesuaikan atribut yang ingin ditampilkan
        },
        {
          model: Car,
          attributes: ['id', 'brand', 'model', 'price'] // Sesuaikan atribut yang ingin ditampilkan
        },
        {
          model: InterestTenor,
          attributes: ['id', 'tenor', 'interest'] // Sesuaikan atribut yang ingin ditampilkan
        },
        {
          model: StatusCreditTransaction,
          attributes: ['id', 'name']
        },
        {
          model: CreditDetail,
          attributes: ['id', 'name', 'period', 'interest_rate', 'total_interest', 'down_payment', 'loan_amount', 'monthly_payment']
        }
      ],
      attributes: { exclude: ['user_id', 'car_id', 'interest_tenor_id', 'status_id', 'detail_id'] } // Menyembunyikan foreign key
    });
    if (!transaction) {
      throw new Error('Credit transaction not found');
    }
    logger.info(`Fetched credit transaction ${id}`);
    return transaction;
  } catch (error) {
    logger.error('Error fetching credit transaction by id', error);
    throw new Error('Error fetching credit transaction by id');
  }
};

// Mendapatkan transaksi kredit berdasarkan user ID
exports.getCreditTransactionsByUserId = async (userId) => {
  try {
    const transactions = await CreditTransaction.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'] // Sesuaikan atribut yang ingin ditampilkan
        },
        {
          model: Car,
          attributes: ['id', 'brand', 'model', 'price'] // Sesuaikan atribut yang ingin ditampilkan
        },
        {
          model: InterestTenor,
          attributes: ['id', 'tenor', 'interest'] // Sesuaikan atribut yang ingin ditampilkan
        },
        {
          model: StatusCreditTransaction,
          attributes: ['id', 'name']
        },
        {
          model: CreditDetail,
          attributes: ['id', 'name', 'period', 'interest_rate', 'total_interest', 'down_payment', 'loan_amount', 'monthly_payment']
        }
      ],
      attributes: { exclude: ['user_id', 'car_id', 'interest_tenor_id', 'status_id', 'detail_id'] } // Menyembunyikan foreign key
    });
    logger.info(`Fetched ${transactions.length} credit transactions for user ${userId}`);
    return transactions;
  } catch (error) {
    logger.error('Error fetching credit transactions by user id', error);
    throw new Error('Error fetching credit transactions by user id');
  }
};

// Menambahkan transaksi kredit baru
exports.createCreditTransaction = async (transactionData) => {
  try {
    const simulation = await this.creditTransactionSimulation(transactionData);

    if (!simulation) {
      throw new Error('Error creating simulation credit transaction');
    }

    const detailTransaction = await CreditDetail.create(simulation);
    
    const newTransactionData = { 
      ...transactionData, 
      detail_id: detailTransaction.id 
    };

    const newTransaction = await CreditTransaction.create(newTransactionData);
    logger.info(`Credit transaction created successfully`);
    return newTransaction;
  } catch (error) {
    logger.error('Error creating credit transaction', error);
    throw new Error('Error creating credit transaction');
  }
};

exports.creditTransactionSimulation = async (requestData) => {
  try {
    const car = await Car.findByPk(requestData.car_id);
    const Itenor = await InterestTenor.findByPk(requestData.interest_tenor_id);

    if (!car || !Itenor) {
      throw new Error('Missing car or interest tenor parameter');
    }

    const carPrice = parseFloat(car.price);
    const interestRate = parseFloat(Itenor.interest);
    const period = Itenor.tenor;

    // Menghitung komponen kredit
    const downPayment = carPrice * 0.25; // 25% dari harga mobil
    const loanBase = carPrice * 0.75; // 75% dari harga mobil
    const totalInterest = (interestRate / 100) * loanBase; // Total bunga
    const loanAmount = carPrice + totalInterest; // Total pinjaman (harga mobil + bunga)
    const monthlyPayment = (loanBase + totalInterest) / period; // Cicilan per bulan

    return {
      name: `${car.brand} ${car.model}`,
      period: period,
      interest_rate: interestRate,
      total_interest: totalInterest,
      down_payment: downPayment,
      loan_amount: loanAmount,
      monthly_payment: monthlyPayment,
      // car: car.toJSON(),
      // interest_tenor:Itenor.toJSON()
    };
  } catch (error) {
    throw new Error(`Error in credit transaction simulation: ${error.message}`);
  }
};

exports.getAllCreditTransactionsOnGoingHistory = async (userId, statusType) => {
  try {
    let statusIds;

    // Tentukan status berdasarkan input statusType
    if (statusType === "onGoing") {
      statusIds = [1, 2]; // Status 1 dan 2 untuk transaksi yang sedang berlangsung
    } else if (statusType === "history") {
      statusIds = [3, 4]; // Status 3 dan 4 untuk transaksi yang telah selesai
    } else {
      throw new Error('Invalid status type. Use "onGoing" or "history"');
    }

    const transactions = await CreditTransaction.findAll({
      where: {
        user_id: userId,
        status_id: statusIds // Memfilter berdasarkan status yang sesuai
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Car,
          attributes: ['id', 'brand', 'model', 'price']
        },
        {
          model: InterestTenor,
          attributes: ['id', 'tenor', 'interest']
        },
        {
          model: StatusCreditTransaction,
          attributes: ['id', 'name']
        }
      ],
      attributes: { exclude: ['user_id', 'car_id', 'interest_tenor_id', 'status_id'] }
    });

    logger.info(`Fetched ${transactions.length} credit transactions for user ID: ${userId} with status: ${statusType}`);
    return transactions;
  } catch (error) {
    logger.error(`Error fetching credit transactions for user ID: ${userId} with status: ${statusType}`, error);
    throw new Error(error.message);
  }
};


