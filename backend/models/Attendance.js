const mongoose =
  require('mongoose');

const attendanceSchema =
  new mongoose.Schema(

    {

      employeeId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Employee',

        required: true
      },

      status: {

        type: String,

        enum: [
          'Present',
          'Absent',
          'Late'
        ],

        default: 'Present'
      },

      checkIn: {

        type: String
      },

      date: {

        type: Date,

        default: Date.now
      }

    },

    {
      timestamps: true
    }

  );

module.exports =
  mongoose.model(
    'Attendance',
    attendanceSchema
  );