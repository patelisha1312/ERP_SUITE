const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const roleMiddleware = require('../middleware/roleMiddleware');


// Employee Route
router.get(
  '/profile',
  authMiddleware,
  (req, res) => {

    res.json({
      message: 'Employee Profile Accessed',
      user: req.user
    });

  }
);


// Admin Route
router.get(
  '/admin-dashboard',
  authMiddleware,
  roleMiddleware('admin'),
  (req, res) => {

    res.json({
      message: 'Welcome Admin'
    });

  }
);


// Manager Route
router.get(
  '/manager-dashboard',
  authMiddleware,
  roleMiddleware('admin', 'manager'),
  (req, res) => {

    res.json({
      message: 'Welcome Manager'
    });

  }
);

module.exports = router;