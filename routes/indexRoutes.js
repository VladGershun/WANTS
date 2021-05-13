const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db');

info = "";

router.get('/', (req, res) => {
  res.render(path.resolve('./myviews/index'));
});

router.get('/index', (req, res) => {
  res.render(path.resolve('./myviews/index'));
});


router.post('/index', (req, res) => {
  let post = {
    username: req.body.username,
    password: req.body.password,
  }

  let sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  let query = db.query(sql, [post.username, post.password], (err, result) => {
      if(err) throw err;
      if(result.length != 0) { //if person is found populate and update thier query
        res.render(path.resolve('./myviews/home')); 
      } else {
        res.render(path.resolve('./myviews/index'), {
          info: 'The Username Or Password You Have Entered Does Not Match Our Records'
        }); 
      }

  });
});


module.exports = router;