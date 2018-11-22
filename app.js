const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require('./redis');
const passport = require('passport');
const constants = require('./constants')
require("dotenv").config();

// database setting
const db = require("./utils/database");
const connection = db.createConnection();
const app = express();

connection.query("SELECT * FROM media", (err, results, fields) => {
  console.log(results); // results contains rows returned by server
});

// multer storage
const ms = require("./utils/multer");

const api = require("./api");

const SESSION_SECRET = 'somegoodsecret***';

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
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

// routes
api(app);

module.exports = app;
