const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/middleware/isLoggedIn");
const Event = require("../models/eventModel");
const isAdmin = require("../utils/middleware/isAdmin");

router.get("/user/:userId", isLoggedIn, async (req, res) => {
  const userId = req.params.userId;
  const row = await Event.getEventsByUserId(userId);
  res.send(row);
});

router.delete("/:id", isAdmin, async (req, res) => {
  const eventId = req.params.id;
  await Event.deleteEventById(eventId);
  res.send("ok");
});

module.exports = router;
