// const mysql = require('mysql2/promise');
// const db = require('../utils/database');
//
//
const promisePool = require('../utils/database')

class Event {
  static async getEvents() {
    try {
      const [rows] = await promisePool.query(`Select * from event`);
      return rows;
    } catch (e) {
      console.error(e);
    }
  }
  static async getEventById(id) {
    try {
      const [rows] = await promisePool.query(
        `Select * from event WHERE eId = ${id}`
      );
      return rows;
    } catch (e) {
      console.error(e);
    }
  }
  static async addEvent (event) {

  try {
    await promisePool.execute(
      `Insert INTO event (${Object.keys(event)}) VALUES (${Object.keys(event).map(
        () => "?"
      )})`,
      Object.values(event)
    );
  } catch (e) {
    console.error(e);
  }
};
}

module.exports = Event;
