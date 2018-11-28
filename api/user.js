const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/middleware/isLoggedIn");
const User = require("../models/userModel");
// @route GET /current
// @desc return current user info
// @access private

// TODO dont send all data to the client!! fix it
router.get("/current", isLoggedIn, (req, res) => {
  res.json(req.user);
});

router.get("/:id", isLoggedIn, async (req, res) => {
  const users = User.getUsers();
  res.json(users);
});

// TODO GET all users, getuserbyid, deleteuserbyid, updateuser

module.exports = router;
