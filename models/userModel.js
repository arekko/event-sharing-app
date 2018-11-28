const promisePool = require("../utils/database");

const getUserByUsername = async username => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM user WHERE username = ?",
      [username]
    );
    console.log(rows);
    return rows;
  } catch (e) {
    console.error(e);
  }
};

const getUserByEmail = async email => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM user WHERE email = ?", [
      email
    ]);
    console.log(rows);
    return rows;
  } catch (e) {
    console.error(e);
  }
};

// This is cool!

const addUser = async user => {
  try {
    await promisePool.execute(
      `Insert INTO user (${Object.keys(user)}) VALUES (${Object.keys(user).map(
        () => "?"
      )})`,
      Object.values(user)
    );
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  addUser,
  getUserByUsername,
  getUserByEmail
};
