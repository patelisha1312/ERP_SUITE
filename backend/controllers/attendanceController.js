const Attendance =
  require('../models/Attendance');

const Employee =
  require('../models/Employee');


// MARK ATTENDANCE

exports.markAttendance =
  async (req, res) => {

    try {

      const {

        employeeId,
        status,
        checkIn

      } = req.body;

      const attendance =
        await Attendance.create({

          employeeId,
          status,
          checkIn

        });

      res.status(201).json({

        message:
          'Attendance Marked',

        attendance

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };


// GET ATTENDANCE

exports.getAttendance =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.find()

        .populate(
          'employeeId'
        )

        .sort({
          createdAt: -1
        });

      res.status(200).json(
        attendance
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };