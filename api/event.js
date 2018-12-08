


const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/middleware/isLoggedIn");
const Event = require("../models/eventModel");






router.get('/user/:userId', isLoggedIn, async (req, res) => {
  const userId = req.params.userId;
  const row = await Event.getEventsByUserId(userId)
  res.send(row);
})



module.exports = router