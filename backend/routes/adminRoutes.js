const express = require('express');
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Get All Users (Admins can use this to view all users)
router.get('/users', protect, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Permission denied' });
  }

  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
