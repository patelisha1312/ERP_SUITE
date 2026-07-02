const Employee = require('../models/Employee');
const {
  addActivity
} = require('./activityController');

// Add Employee
exports.addEmployee = async (req, res) => {

  try {

    const employee = await Employee.create(req.body);
await addActivity(
  `Employee ${employee.name} added`,
  'employee'
);
    res.status(201).json({
      message: 'Employee Added',
      employee
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Get All Employees
exports.getEmployees = async (req, res) => {

  try {

    const employees = await Employee.find();

    res.status(200).json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
exports.deleteEmployee = async (req, res) => {

  try {

    await Employee.findByIdAndDelete(req.params.id);
await addActivity(
  'Employee deleted',
  'employee'
);
    res.status(200).json({
      message: 'Employee Deleted'
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
exports.updateEmployee = async (req, res) => {

  try {

    const updatedEmployee =
      await Employee.findByIdAndUpdate(

        req.params.id,
        req.body,
        { new: true }

      );

    res.status(200).json({
      message: 'Employee Updated',
      updatedEmployee
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};