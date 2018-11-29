const promisePool = require("../utils/database");

const getUserById = async id => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM user WHERE uId = ?", [
      id
    ]);
    return rows;
  } catch (e) {
    console.error(e);
  }
};

const getUserByUsername = async username => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM user WHERE username = ?",
      [username]
    );
    return rows;
  } catch (e) {
    console.error(e);
  }
};

const getUserByEmail = async email => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );
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

const getUsers = async () => {
  try {
    const [rows] = await promisePool.query(`Select * from user`);
    return rows;
  } catch (e) {
    console.error(e);
  }
};

const deleteUserById = async userId => {
  try {
    const [results, fields] = await promisePool.execute(
      `DELETE FROM user WHERE uId = ?`,
      [userId]
    );

    console.log(results);
    console.log(fields);
  } catch (e) {
    console.error(e);
  }
};

const updateCurrentUser = async (userId, newUserData) => {
  const updateData = [];
  for (const key in newUserData) {
    updateData.push(`${key} = "${newUserData[key]}"`);
  }
  try {
    await promisePool.execute(
      `UPDATE user SET ${updateData} WHERE uId = "${userId}" `
    );
  } catch (e) {
    console.error(e);
  }
};

const updateCurrentDate = async (userId, column) => {
  const currentDate = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
    console.log(currentDate);
  const newTime = {};
  newTime[`${column}`] = currentDate;
  await updateCurrentUser(userId, newTime);
};

module.exports = {
  addUser,
  getUserByUsername,
  getUserByEmail,
  getUserById,
  getUsers,
  deleteUserById,
  updateCurrentUser,
  updateCurrentDate
};
