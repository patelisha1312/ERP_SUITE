const Employee =
  require('../models/Employee');

const Finance =
  require('../models/Finance');

const Inventory =
  require('../models/Inventory');

const chatbotReply =
  async (req, res) => {

    try {

      const { message } = req.body;

      const userMessage =
        message.toLowerCase();

      // EMPLOYEE COUNT

      if (

        userMessage.includes(
          'employee'
        )

        &&

        userMessage.includes(
          'count'
        )

      ) {

        const employeeCount =
          await Employee.countDocuments();

        return res.json({

          reply:
            `Total employees are ${employeeCount}`

        });

      }

      // INVENTORY COUNT

      if (

        userMessage.includes(
          'inventory'
        )

        ||

        userMessage.includes(
          'product'
        )

      ) {

        const totalProducts =
          await Inventory.countDocuments();

        return res.json({

          reply:
            `Total products are ${totalProducts}`

        });

      }

      // TOTAL INCOME

      if (

        userMessage.includes(
          'income'
        )

      ) {

        const financeData =
          await Finance.find({

            type: 'income'

          });

        const totalIncome =
          financeData.reduce(

            (acc, item) =>

              acc + item.amount,

            0

          );

        return res.json({

          reply:
            `Total income is ₹${totalIncome}`

        });

      }

      // TOTAL EXPENSE

      if (

        userMessage.includes(
          'expense'
        )

      ) {

        const financeData =
          await Finance.find({

            type: 'expense'

          });

        const totalExpense =
          financeData.reduce(

            (acc, item) =>

              acc + item.amount,

            0

          );

        return res.json({

          reply:
            `Total expense is ₹${totalExpense}`

        });

      }

      // DEFAULT RESPONSE

      return res.json({

        reply:
          'Sorry, I could not understand your question.'

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
  chatbotReply
};