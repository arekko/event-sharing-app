const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require("./redis");
const passport = require("passport");
const constants = require("./constants");
require("dotenv").config();

const db = require('./utils/database');

const app = express();

const api = require("./api");

const SESSION_SECRET = "somegoodsecret***";

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/", express.static(__dirname + "/public"));

app.use(
  session({
    store: new RedisStore({
      client: redis,
      prefix: constants.redisSessionPrefix
    }),
    name: "qid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serialization');
  console.log(user.uId);
  done(null, user.uId);
});

// used to deserialize the user
passport.deserializeUser(async (uId, done) => {
  const connection = await db.createConnection();
  const [usernameRows] = await connection.execute(
      "SELECT * FROM user WHERE uId = ?",
      [uId]
  );

  done(null, usernameRows[0])
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

require('./utils/passport/passport-local')();




// routes
api(app);

module.exports = app;
