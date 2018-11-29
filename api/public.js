const isLoggedIn = require("../utils/middleware/isLoggedIn");
const User = require("../models/userModel");
// const upload =  multer({ dest: 'public/uploads'})

const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.render("homepage", {
    user: req.user
  });
});

// router.get("/", (req, res) => {
//   console.log(req.user)
//   res.sendFile(path.join(__dirname, "..", "public/index.html"));
// });

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

/*
 * @GET /logout
 * @desc logout user route
 *
 *
 **/
router.get("/logout", async (req, res) => {
  await User.updateCurrentDate(req.user.uId, "last_logout_date");
  req.logout();
  res.redirect("/");
});

/*
 * @GET /registration
 * @desc logout user route
 *
 *
 **/
router.get("/registration", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "..", "public/registration.html"));
  }
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/profile.html"));
});

module.exports = router;
