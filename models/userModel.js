const promisePool = require("../utils/database");



class User {

static async getUserById (id) {
  try {
    const [rows] = await promisePool.query("SELECT * FROM user WHERE uId = ?", [
      id
    ]);
    return rows;
  } catch (e) {
    console.error(e);
  }
};

static async getUserByUsername (username) {
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

static async getUserByEmail (email) {
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

static async addUser (user) {
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

static async getUsers () {
  try {
    const [rows] = await promisePool.query(`Select * from user`);
    return rows;
  } catch (e) {
    console.error(e);
  }
};

static async deleteUserById (userId) {
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

static async updateCurrentUser (userId, newUserData) {
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

static async updateCurrentDate (userId, column) {
  const currentDate = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
    console.log(currentDate);
  const newTime = {};
  newTime[`${column}`] = currentDate;
  await this.updateCurrentUser(userId, newTime);
};

}


module.exports = User; 