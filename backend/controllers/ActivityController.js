const Activity =
  require('../models/Activity');

exports.getActivities =
  async (req, res) => {

    try {

      const activities =
        await Activity
          .find()
          .sort({
            createdAt: -1
          });

      res.json(activities);

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };

exports.addActivity =
  async (message, type) => {

    try {

      await Activity.create({

        message,
        type

      });

    } catch (error) {

      console.log(error);

    }

  };