# Event sharing app

Idea Evoo is an app for sharing and finding events.

Targer group Primarily for anyone over 18 years old

Features Unregistered user can: Sign up Browse events See comments

Registered user can: Log in Log out Create event Delete event Comment event See other’s profiles Modify their own profile Everything the unregistered user can do

Administrator can: access to administator page see all the users, their events and comments delete users add other administrators

How to run Run: npm install create a database and insert the tables from db.sql file create a .env file with the required login credentials to your database.

The app requires: express body-parser morgan cors cookie-parser express-session connect-redis path connect-flash

After that you run the app with node app.js (or nodemon if you run npm install nodemon)

