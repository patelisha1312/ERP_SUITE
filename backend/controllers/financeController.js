const Finance = require('../models/Finance');
const {
  addActivity
} = require('./activityController');

// Add Transaction
exports.addTransaction = async (req, res) => {

  try {

    const transaction =
      await Finance.create(req.body);
await addActivity(
  `Finance ${transaction.title} added`,
  'finance'
);
    res.status(201).json({
      message: 'Transaction Added',
      transaction
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Get Transactions
exports.getTransactions = async (req, res) => {

  try {

    const transactions =
      await Finance.find();

    res.status(200).json(transactions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};