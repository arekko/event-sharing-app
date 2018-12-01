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
        console.log(username, password);
        const inputPassword = password;

        const userRow = await User.getUserByUsername(username);

        if (userRow.length > 0) {
          const user = userRow[0];

          // password verification
          try {
            // compare the passwords
            const match = await bcrypt.compare(inputPassword, user.password);

            if (match) {
              await User.updateCurrentDate(user.uId, "last_login_date");
              return done(null, user);
            } else {
              return done(null, false, req.flash('loginMessage', "Incorrect password."));
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          return done(null, false, req.flash('loginMessage', 'Incorrect username.'));
        }
      }
    )
  );
};

module.exports = passportLocal;
