const promisePool = require("../utils/database");

class Comment {
  static async getCustomComments(eventId) {
    try {
        const [rows] = await promisePool.query(`
          select
                comment.cId,
                comment.text,
                comment.date,
                user.uId,
                user.firstname,
                user.lastname,
                user.photo_url_thumb
          FROM user, comment, event
          Where 
            comment.user_id = user.uId
          AND 
            comment.event_id = event.eId 
          AND 
            comment.event_id = ?
          ORDER BY date ASC
          `, [eventId]);
      return rows;
    } catch (e) {
      console.error(e);
    }
  }

  static async getComments() {
    try {
      const [rows] = await promisePool.query(`
      Select
        comment
      from comment`);
      return rows;
    } catch (e) {
      console.error(e);
    }
  }

  static async addComment(comment) {
    try {
      await promisePool.query(
        `Insert INTO comment (${Object.keys(comment)}) VALUES (${Object.keys(
          comment
        ).map(() => "?")})`,
        Object.values(comment)
      );
    } catch (e) {
      console.error(e);
    }
  }
  static async getComment(id) {
    try {
      const [rows] = await promisePool.query(
        `Select * from comment WHERE cId = ?`,
        [id]
      );
      return rows;
    } catch (e) {
      console.error(e);
    }
  }

  static async deleteById(id) {

    try {
      const [rows] = await promisePool.query(
        `DELETE FROM comment WHERE cId = ?`,
        [id]
      );
      return rows;
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Comment;
