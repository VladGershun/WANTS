const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db');

info = ""; //created string for info

router.get('/', (req, res) => {
  res.render(path.resolve('./myviews/index'));
});

router.get('/index', (req, res) => {
  res.render(path.resolve('./myviews/index'));
});


router.post('/index', (req, res) => {
  let post = { //retreive user input
    username: req.body.username,
    password: req.body.password,
  }
  //checking table if user exists
  let sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  let query = db.query(sql, [post.username, post.password], (err, result) => {
      if(err) throw err;
      if(result.length != 0) { //if user is found move to home page
        res.render(path.resolve('./myviews/home')); 
      } else {
        res.render(path.resolve('./myviews/index'), { //display if user is not found
          info: 'The Username Or Password You Have Entered Does Not Match Our Records'
        }); 
      }

  });
});


module.exports = router;