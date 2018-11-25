const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');
const bcrypt = require('bcrypt');

// Local strategy login
const passportLocal = () => {
  passport.use(
      new LocalStrategy(
          {
            // // by default, local strategy uses username and password,
            // usernameField: 'username',
            // passwordField: 'password',
            passReqToCallback: true, // allows us to pass back the entire request to the callback
          },
          async (req, username, password, done) => {

            const inputPassword = password;
            // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists

            console.log(username, password);
            const conn = await db.createConnection();

            const [usernameRows] = await conn.execute(
                'SELECT * FROM user WHERE username = ?',
                [username],
            );

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
                confirmed,
              } = usernameRows[0]);

              // password verification
              try {
                // compare the passwords
                const match = await bcrypt.compare(inputPassword,
                    user.password);

                console.log(match)

                if (match) {
                  console.log('password did match');
                  return done(null, user);
                } else {
                  console.log('password did not match');
                  req.errors = {
                    error: {
                      path: 'auth',
                      message: 'Incorrect password',
                    },
                  };

                  return done(null, false);
                }
              } catch (err) {
                console.log(err);
              }

            } else {
              req.errors = {
                error: {
                  path: 'auth',
                  message: 'Username not found',
                },
              };
              return done(null, false);
            }
          },
      ),
  );
};

module.exports = passportLocal;
