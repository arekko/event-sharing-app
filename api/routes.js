
const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/login', (req, res) => {
  console.log(__dirname);
    res.sendFile(path.join(__dirname, '..', 'public/login.html'))
});

router.get('/registration', (req, res) => {
  console.log(__dirname);
    res.sendFile(path.join(__dirname, '..', 'public/registration.html'))
});

router.get('/profile', (req, res) => {
  console.log(__dirname);
    res.sendFile(path.join(__dirname, '..', 'public/profile.html'))
});




module.exports = router;