const express = require("express");
const multer = require('multer');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var session = require('express-session');
require('dotenv').config();
// database setting
const db = require('./utils/database');

const app = express();
const port = process.env.PORT | 3000;

const mysql = require('mysql2/promise');
// multer storage
const ms = require('./utils/multer');

const storage = ms.createMulterStorage();

const api = require('./api');



// Start server
module.exports = startServer = async () => {

    await db.createConnection();
    // We create connection here
    console.log('connected to mysql');


    // Middleware
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(session({secret: "Shh, its a secret!"}));
    app.use('/uploads', express.static(__dirname + '/uploads'));
    app.use('/', express.static(__dirname + '/public'));

    // routes
    api(app);


    app.listen(port, () => console.log(`Example app listening on port ${port}!`));

};