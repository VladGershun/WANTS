const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
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

info = ""; //created string for info

router.get('/', (req, res) => {
  res.render(path.resolve('./myviews/index'));
});


router.get('/index', (req, res) => {
  res.render(path.resolve('./myviews/index'));
});



router.post('/index', async (req, res, next) => {
  let post = { //retreive user input
    username: req.body.username,
    password: req.body.password,
  }

  try {
    const user = await dbb('users').first('*').where({username: post.username}); 
    if(!user) {
      res.render(path.resolve('./myviews/index'), { //display if user is not found
                info: 'The Username Or Password You Have Entered Does Not Match Our Records'
              });
    } 
    if(user) {
      const validPass = await bcrypt.compare(post.password, user.password);
      if(validPass){
      
        // let sql = `SELECT * FROM users WHERE username = ?`;
        // let query = db.query(sql, post.username, async (err, result) => {
        // if(err) throw err;
        // const id = result[0].user;

        // const token = jwt.sign({ id }, process.env.ACCESS_TOKEN, {
        //   expiresIn: process.env.TIME
        // })

        // const cookieOptions = {
        //   expires: new Date(
        //     Date.now() + process.env.COOKIETIME
        //   ),
        //   httpOnly: true
        // }

        // res.cookie('jwt', token, cookieOptions)
        res.status(200).redirect('/home')
        // });
        
        
      
        
      
     
  

      } else {
        res.render(path.resolve('./myviews/index'), { //display if user is not found
                info: 'The Username Or Password You Have Entered Does Not Match Our Records'
              }); 
      }
    }  
  } catch(e) {
    console.log(e);
  }
});


module.exports = router;