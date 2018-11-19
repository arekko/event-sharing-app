const express = require("express");
const multer = require('multer');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var session = require('express-session');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const mysql = require('mysql2/promise');

//  storage setting for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage: storage});


// Creating connection
const createConnection = async () => {
    return await mysql.createConnection({
        host: process.env.MYSQL_URL,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: 'appdb'
    });
};

// Start server
module.exports = startServer = async () => {

    // We create connection here
    const connection = await createConnection();
    console.log('connected to mysql');
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));


    // Middleware
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(session({secret: "Shh, its a secret!"}));
    app.use('/uploads', express.static(__dirname + '/uploads'));
    app.use('/', express.static(__dirname + '/public'));


    // Routes

    //
    // app.post("/json", (req, res) => {
    //     console.log(JSON.stringify(req.body, null, 2));
    //     res.json(req.body)
    // });
    //
    // app.get('/db', async (req, res) => {
    //
    //     const [rows] = await connection.execute('SELECT * FROM animals');
    //
    //     res.send(rows)
    //
    // });
    //
    // app.post('/file', upload.single('image'), (req, res) => {
    //
    //     if (req.file) {
    //
    //         const host = req.hostname;
    //         const filePath = req.protocol + "://" + host + ':3000' + '/' + req.file.path;
    //         res.send({
    //             imgPath: filePath
    //         })
    //     } else {
    //         res.json({
    //             message: 'file not found'
    //         })
    //     }
    // })

};