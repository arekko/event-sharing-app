const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../database");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

// Local strategy login
const passportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        // allows us to pass back the entire request to the callback
        passReqToCallback: true
      },
      async (req, username, password, done) => {
        const inputPassword = password;

        console.log(username, password);
        const userRow = await User.getUserByUsername(username);

        if (userRow.length > 0) {
          const user = userRow[0];

          // password verification
          try {
            // compare the passwords
            const match = await bcrypt.compare(inputPassword, user.password);

            if (match) {
              console.log("password did match");
              return done(null, user);
            } else {
              console.log("password did not match");
              req.errors = {
                error: {
                  path: "auth",
                  message: "Incorrect password"
                }
              };

              return done(null, false);
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          req.errors = {
            error: {
              path: "auth",
              message: "Username not found"
            }
          };
          return done(null, false);
        }
      }
    )
  );
};

module.exports = passportLocal;
