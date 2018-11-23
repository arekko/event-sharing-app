const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../database");
const argon2 = require('argon2');

// Local strategy login
const passportLocal = () => {
  passport.use(
      new LocalStrategy(
          {
            // by default, local strategy uses username and password,
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true // allows us to pass back the entire request to the callback
          },
          async (req, username, password, done) => {

            const inputPassport = password;
            // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists

            console.log(username, password);
            const conn = await db.createConnection();

            const [usernameRows] = await conn.execute(
                "SELECT * FROM user WHERE username = ?",
                [username]
            );

            console.log(usernameRows.length);

            if (usernameRows.length > 0) {
              const user = ({
                uId,
                username,
                email,
                firstname,
                password,
                city,
                sex,
                age,
                country,
                avatar_url,
                bio,
                confirmed
              } = usernameRows[0]);

              console.log(inputPassport);

              // password verification
              try {
                if (await argon2.verify(user.password, inputPassport)) {
                  // password match
                  console.log('password did match');
                  return done(null, user);
                } else {
                  // password did not match
                  console.log('password did not match')
                }
              } catch (err) {
                // internal failure
                console.log(err)

              }

            } else {
              return done(null, false);
            }
          }
      )
  )
};

module.exports = passportLocal;
