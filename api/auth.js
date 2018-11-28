var multer = require("multer");
const promisePool = require("../utils/database");

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
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      if (req.errors) {
        return res.send(req.errors);
      }
    }

    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.send({
        error: null
      });
    });
  })(req, res, next);
});

router.use("/registration", upload.single("avatar"), (req, res, next) => {
  sharp.resizeImg(
    req.file.path,
    200,
    `public/images/user_profile_img/thumbnails/thumb:${req.file.originalname}`,
    next
  );
});

router.post("/registration", async (req, res) => {
  const originalImageUrl = `http://localhost:3000/images/user_profile_img/original/original:${
    req.file.originalname
  }`;
  const thumbnailImageUrl = `http://localhost:3000/images/user_profile_img/thumbnails/thumb:${
    req.file.originalname
  }`;

  // const connection = await db.createConnection();
  let hashPassword;
  const email = req.body.email;
  const username = req.body.username;
  try {
    hashPassword = await bcrypt.hash(req.body.password, 10);
  } catch (e) {
    console.error(e);
  }

  const userId = uuidv4();
  const userData = [];
  userData.push(userId);
  userData.push(req.body.username);
  userData.push(req.body.firstname);
  userData.push(req.body.lastname);
  userData.push(req.body.email);
  userData.push(hashPassword);

  // @TODO move it to model folder
  // const [usernameRows] = await promisePool.execute(
  //   "SELECT * FROM user WHERE username = ?",
  //   [username]
  // );
  const usernameRows = await User.getUserByUsername(username);
  

  const [emailRows] = await promisePool.execute(
    "SELECT * FROM user WHERE email = ?",
    [email]
  );

  if (usernameRows.length > 0) {
    res.send({
      message: "error",
      error: "Username already exists"
    });
  } else if (emailRows.length > 0) {
    res.send({
      message: "error",
      error: "Email already exists"
    });
  } else {
    try {
      User.addUser(
        promisePool,
        "user",
        ["uId", "username", "firstname", "lastname", "email", "password"],
        userData
      );

      // await connection.execute(
      //     'Insert INTO user (uId, username, firstname, lastname, email, password) VALUES (?,?,?,?,?,?)',
      //     userData,
      // );
      // TODO create a model for this query
      await promisePool.execute(
        "Insert INTO time_user (fk_user_id_time_user) VALUES (?)",
        [userId]
      );
      await promisePool.execute(
        "Insert INTO profile_user_photo (original_img_url, thumb_img_url, user_id) VALUES (?, ?, ?)",
        [originalImageUrl, thumbnailImageUrl, userId]
      );
    } catch (e) {
      console.log(e);
    }

    res.send({
      message: "success",
      error: null
    });
  }
});

module.exports = router;
