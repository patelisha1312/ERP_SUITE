const Employee =
  require('../models/Employee');

const Finance =
  require('../models/Finance');

const Inventory =
  require('../models/Inventory');

const getDashboardAnalytics =
  async (req, res) => {

    try {

      // EMPLOYEE COUNT

      const employeeCount =
        await Employee.countDocuments();

      // INVENTORY COUNT

      const totalProducts =
        await Inventory.countDocuments();

      // FINANCE DATA

      const financeData =
        await Finance.find();

      // TOTAL INCOME

      const totalIncome =
        financeData
          .filter(
            item =>
              item.type === 'income'
          )
          .reduce(
            (acc, item) =>
              acc + item.amount,
            0
          );

      // TOTAL EXPENSE

      const totalExpense =
        financeData
          .filter(
            item =>
              item.type === 'expense'
          )
          .reduce(
            (acc, item) =>
              acc + item.amount,
            0
          );

      res.json({

        employeeCount,
        totalProducts,
        totalIncome,
        totalExpense,
        financeData

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Server Error'
      });

    }

  };

module.exports = {
  getDashboardAnalytics
};