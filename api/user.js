const express = require('express');
const router = express.Router();
const isLoggedIn = require('../utils/middleware/isLoggedIn');

// @route GET /current
// @desc return current user info
// @access private

// TODO dont send all data to the client!! fix it
router.get('/current', isLoggedIn, (req, res) => {
  res.json(req.user);
});

module.exports = router;