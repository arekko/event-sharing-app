var multer = require('multer');
const db = require('../utils/database');
// const connection = db.createConnection();
const uuidv4 = require('uuid/v4');
const passport = require('passport');
const argon2 = require('argon2');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, `original-img:${file.originalname}`);
  },
});

var upload = multer({storage: storage});

// const upload =  multer({ dest: 'public/uploads'})

const express = require('express');
const router = express.Router();
const path = require('path');

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
};

// router.get("/", (req, res) => {
//   console.log(req.user)
//   res.sendFile(path.join(__dirname, "..", "public/index.html"));
// });

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/profile');
  } else {
    res.sendFile(path.join(__dirname, '..', 'public/login.html'));
  }
});

// process the login form
router.post(
    '/login',
    (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {
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

        req.logIn(user, (err) =>  {
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
router.post('/registration', upload.single('avatar'), async (req, res) => {

  // if user logged in we redirect him to profie page

  const connection = await db.createConnection();
  let hashPassword;
  const email = req.body.email;
  const username = req.body.username;
  try {
    hashPassword = await argon2.hash(req.body.password);

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
      `http://localhost:3000/uploads/original-img:${req.file.originalname}`,
  );
  // @TODO move it to model folder
  const [usernameRows] = await connection.execute(
      'SELECT * FROM user WHERE username = ?',
      [username],
  );

  const [emailRows] = await connection.execute(
      'SELECT * FROM user WHERE email = ?',
      [email],
  );

  if (usernameRows.length > 0) {
    res.send({
      message: 'error',
      error: 'Username already exists',
    });
  } else if (emailRows.length > 0) {
    res.send({
      message: 'error',
      error: 'Email already exists',
    });
  } else {
    await connection.execute(
        'Insert INTO user (uId, username, firstname, lastname, email, password, avatar_url) VALUES (?,?,?,?,?,?,?)',
        userData,
    );
    res.send({
      message: 'success',
      error: null,
    });
  }
});

/*
* @GET /logout
* @desc logout user route
*
*
**/
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

/*
* @GET /registration
* @desc logout user route
*
*
**/
router.get('/registration', (req, res) => {
  if (req.user) {
    res.redirect('/profile');
  } else {
    res.sendFile(path.join(__dirname, '..', 'public/registration.html'));
  }
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/profile.html'));
});

module.exports = router;
