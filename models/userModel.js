const promisePool = require('../utils/database');



const addUser = async (connection, table, columns, values) => {
  await connection.execute(
    `Insert INTO ${table} (${columns[0]}, ${columns[1]}, ${columns[2]}, ${
      columns[3]
    }, ${columns[4]}, ${columns[5]}) 
      VALUES (?,?,?,?,?,?)`,
    values
  );
};

const getUserByUsername = async username => {
  let rows
  try {
     [rows] = await promisePool.query(
      "SELECT * FROM user WHERE username = ?",
      [username]
    );
  } catch (e) {
    console.error(e);
  }
  console.log(rows);
  return rows[0]
};

module.exports = {
  addUser,
  getUserByUsername
};

//
// await connection.execute(
//     'Insert INTO user (uId, username, firstname, lastname, email, password) VALUES (?,?,?,?,?,?)',
//     userData,
// );
// await connection.execute(
//     'Insert INTO time_user (fk_user_id_time_user) VALUES (?)',
//     [userId],
// );
// await connection.execute(
//     'Insert INTO profile_user_photo (original_img_url, thumb_img_url, user_id) VALUES (?, ?, ?)',
//     [originalImageUrl, thumbnailImageUrl, userId],
// );
