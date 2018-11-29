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

router.get("/getuser/:id", isLoggedIn, async (req, res) => {
  const userId = req.params.id
  console.log(userId);

    const user = await User.getUserById(userId)
    res.json(user)

})

router.get("/getall", isLoggedIn, async (req, res) => {
  const users = await User.getUsers();
  res.json(users);
});

// TODO GET all users, getuserbyid, deleteuserbyid, updateuser

module.exports = router;
