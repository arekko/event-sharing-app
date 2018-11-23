const mysql = require('mysql2/promise');

// Creating connection
const createConnection = () => {
    return  mysql.createConnection({
        host: process.env.MYSQL_URL,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB_NAME
    });
};

module.exports = {
    createConnection
};