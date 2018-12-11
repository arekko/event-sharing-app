const Comment = require("../models/commentModel");
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/middleware/isLoggedIn");
const path = require("path");
const uuid = require("uuid/v4");
const formatter = require("../utils/timeFormat");

router.get("/", async (req, res) => {
  const eventId = req.query.eventId;

  const comments = await Comment.getCustomComments(eventId);
  comments.forEach(el => {
    el.date = formatter.date(el.date);
  });
  if (comments.length > 0) {
    res.send({
      message: comments
    });
  } else {
    res.send({
      message: null
    });
  }
});

router.post("/", isLoggedIn, async (req, res) => {
  const commentId = uuid();
  const userId = req.user.uId;
  const newComment = req.body;
  newComment.cId = commentId;
  newComment.user_id = userId;
  // console.log(newComment);
  await Comment.addComment(newComment);
  const row = await Comment.getComment(commentId);
  const comment = row[0];
  comment.date = formatter.date(comment.date);
  console.log(comment);
  res.json(comment);
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  const commentId = req.params.id;
  await Comment.deleteById(commentId);
  res.send({
    message: "ok"
  });
});



router.get("/user/:userId", isLoggedIn, async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const comments = await Comment.getCommentsByUserId(userId);
    res.send(comments);
  });

module.exports = router;
