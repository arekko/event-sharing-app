var multer = require("multer");
const db = require("../utils/database");
// const connection = db.createConnection();
const uuidv4 = require("uuid/v4");
const passport = require("passport");
const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, `original-img:${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// process the login form
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(err, user, info);

    if (err) {
      return next(err);
    }

    if (!user) {
      if (req.errors) {
        console.log(req.errors);
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

// @TODO add some time and picture sizes



// router.use("/registration", )


router.post("/registration", upload.single("avatar"), async (req, res) => {
  // if user logged in we redirect him to profie page

  const connection = await db.createConnection();
  let hashPassword;
  const email = req.body.email;
  const username = req.body.username;
  try {
    hashPassword = await bcrypt.hash(req.body.password, 10);
  } catch (e) {
    console.error(e);
  }

  console.log(hashPassword);

  const userId = uuidv4();
  const userData = [];
  userData.push(userId);
  userData.push(req.body.username);
  userData.push(req.body.firstname);
  userData.push(req.body.lastname);
  userData.push(req.body.email);
  userData.push(hashPassword);
  userData.push(
    `http://localhost:3000/uploads/original-img:${req.file.originalname}`
  );

  // @TODO move it to model folder
  const [usernameRows] = await connection.execute(
    "SELECT * FROM user WHERE username = ?",
    [username]
  );

  const [emailRows] = await connection.execute(
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
    await connection.execute(
      "Insert INTO user (uId, username, firstname, lastname, email, password, avatar_url) VALUES (?,?,?,?,?,?,?)",
      userData
    );
    try {
      await connection.execute(
        "Insert INTO time_user (fk_user_id_time_user) VALUES (?)",
        [userId]
      );
    } catch (e) {
      console.log(e);
    }

    console.log(` User id ${userData}`);

    res.send({
      message: "success",
      error: null
    });
  }
});

module.exports = router;
