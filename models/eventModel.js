// const mysql = require('mysql2/promise');
// const db = require('../utils/database');
//
//
const promisePool = require("../utils/database");

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
  static async addEvent(event) {
    try {
      await promisePool.execute(
        `Insert INTO event (${Object.keys(event)}) VALUES (${Object.keys(
          event
        ).map(() => "?")})`,
        Object.values(event)
      );
    } catch (e) {
      console.error(e);
    }
  }

  static async getEventsForCards() {
    try {
      const [rows] = await promisePool.query(
        `Select 
            event.eId,
            event.title, 
            event.address, 
            event.photo_card_url,
            user.uId,
            user.firstname, 
            user.lastname, 
            user.photo_url_thumb  
          from 
            event, 
            user 
          where user.uId = event.creater_id`
      );
      return rows;
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Event;
