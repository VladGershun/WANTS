const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db');
const moment = require("moment");

good = "";
bad = "";
pass = "";

router.get('/newuser', (req, res) => {
  res.render(path.resolve('./myviews/newuser'));
});

router.post('/newuser', (req, res) => {
  let post = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    agency: req.body.agency,
    mobile: req.body.phonenumber
  }
  let password = req.body.confirmpass

  let sql = `SELECT * FROM users WHERE username = ?`;
  let query = db.query(sql, post.username, (err, result) => {
      if(err) throw err;
      if(password == post.password) {

        if(result.length == 0) {
          let sql = 'INSERT INTO users SET ?';
          let query = db.query(sql, post, (err, result) => {
              if(err) throw err;
          });
    
          res.render(path.resolve('./myviews/newuser'), {
            good: 'User Was Successfully Created'
          }); 
        } else {
        
          res.render(path.resolve('./myviews/newuser'), {
            pass: 'A User With That Username Already Exists'
          }); 
        }
      } else {
        res.render(path.resolve('./myviews/newuser'), {
          pass: 'Your Password Confirmation Does Not Match'
        }); 
      } 
    });
    
});


module.exports = router;


