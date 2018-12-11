const multer = require("multer");

const constant = require("../constants");
const uuidv4 = require("uuid/v4");
const passport = require("passport");
const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const sharp = require("../utils/sharp");
const User = require("../models/userModel");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images/user_profile_img/original");
  },
  filename: function(req, file, cb) {
    cb(null, `original:${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// process the login form
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login"
//   })
// );

router.use("/registration", upload.single("avatar"), (req, res, next) => {
console.log(req.file);
  sharp.resizeImg(
    req.file.path,
    200,
    `public/images/user_profile_img/thumbnails/thumb:${req.file.originalname}`,
    next
  );
});

router.post("/registration", async (req, res) => {
  const photo_url_original = `${
    constant.HOST_URL
  }/images/user_profile_img/original/original:${req.file.originalname}`;
  const photo_url_thumb = `${
    constant.HOST_URL
  }/images/user_profile_img/thumbnails/thumb:${req.file.originalname}`;

  const { username, email, password, firstname, lastname } = req.body;

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 10);
  } catch (e) {
    console.error(e);
  }

  const userId = uuidv4();
  const newUser = {
    uId: userId,
    username,
    email,
    firstname,
    lastname,
    password: hashPassword,
    photo_url_original,
    photo_url_thumb
  };

  const usernameRows = await User.getUserByUsername(username);
  const emailRows = await User.getUserByEmail(email);

  if (usernameRows.length > 0) {
    req.flash('signupMessage', 'This username already exists.')
    res.redirect('/registration')
  } else if (emailRows.length > 0) {
    req.flash('signupMessage', 'This email already exists.')
    res.redirect('/registration')
  } else {
    await User.addUser(newUser);

    res.redirect('/login')
  }
});

module.exports = router;
