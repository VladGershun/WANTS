const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db');
const moment = require("moment");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const dbb = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
  },
});

good = "";
bad = "";
pass = "";

router.get('/newuser', (req, res) => {
  res.render(path.resolve('./myviews/newuser'));
});

// router.post('/newuser', (req, res) => {
//   let post = {
//     username: req.body.username,
//     password: req.body.password,
//     name: req.body.name,
//     email: req.body.email,
//     agency: req.body.agency,
//     mobile: req.body.phonenumber
//   }
//   let password = req.body.confirmpass

//   let sql = `SELECT * FROM users WHERE username = ?`;
//   let query = db.query(sql, post.username, (err, result) => {
//       if(err) throw err;
//       if(password == post.password) {

//         if(result.length == 0) {
//           let sql = 'INSERT INTO users SET ?';
//           let query = db.query(sql, post, (err, result) => {
//               if(err) throw err;
//           });
    
//           res.render(path.resolve('./myviews/newuser'), {
//             good: 'User Was Successfully Created'
//           }); 
//         } else {
        
//           res.render(path.resolve('./myviews/newuser'), {
//             pass: 'A User With That Username Already Exists'
//           }); 
//         }
//       } else {
//         res.render(path.resolve('./myviews/newuser'), {
//           pass: 'Your Password Confirmation Does Not Match'
//         }); 
//       } 
//     });
    
// });


router.post('/newuser', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const confirmPassword = await bcrypt.hash(req.body.confirmpass, salt)
  
  let post = {
    username: req.body.username,
    password: `${hashedPassword}`,
    name: req.body.name,
    email: req.body.email,
    agency: req.body.agency,
    mobile: req.body.phonenumber
  }

  let sql = `SELECT * FROM users WHERE username = ?`;
  let query = db.query(sql, post.username, async (err, result) => {
      if(err) throw err;
      if(hashedPassword != confirmPassword) {
        res.render(path.resolve('./myviews/newuser'), {
            pass: 'Your Password Confirmation Does Not Match'
          }); 
      }
      if(result.length == 0) {
        await dbb('users').insert({username: post.username, password: hashedPassword, name: post.name, email: post.email, agency: post.agency, mobile: post.mobile});
        res.render(path.resolve('./myviews/newuser'), {
          good: 'User Was Successfully Created'
          }); 
        } else {
          res.render(path.resolve('./myviews/newuser'), {
            pass: 'A User With That Username Already Exists'
          }); 
        }

    });
  } catch(e) {
    res.status(500).send()
  }
});


module.exports = router;


