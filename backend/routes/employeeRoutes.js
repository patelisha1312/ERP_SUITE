const express = require('express');

const router = express.Router();

const {
  addEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee
} = require('../controllers/employeeController');

router.post('/add', addEmployee);

router.get('/', getEmployees);

router.delete('/delete/:id', deleteEmployee);
router.put('/update/:id', updateEmployee);

module.exports = router;