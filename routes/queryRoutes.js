const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db');
const moment = require("moment");


router.get('/query', (req, res) => {
  res.render(path.resolve('./myviews/query'));
});


router.post('/query', (req, res) => {
  let post = {
    agency: req.body.agency,
    dot: req.body.dot,
    inmatefirst: req.body.firstname,
    inmatelast: req.body.lastname,
    dob: req.body.dob,
    list: req.body.short,
  }
 

  if(post.agency != "---") {

  let query1 = `SELECT * FROM inmates WHERE legcheck LIKE "%${post.agency}%"`;
  db.query(query1, post.agency, (err, rows) => {
      if (err) throw err;
      res.locals.moment = moment;
      if(post.list == "on") {
      res.render(path.resolve('./myviews/shortprint'), {
        title: 'Database Query',
        inmates: rows
        
        });

      } else
      res.render(path.resolve('./myviews/fullprint'), {
       title: 'Database Query',
       inmates: rows
      }); 

      
  }); 
  }

  let sql = `SELECT * FROM inmates WHERE eagency = ? OR tripdate = ? OR (inmatefirst = ? AND inmatelast = ? AND dob = ?)`;
  let query = db.query(sql, [post.agency, post.dot, post.inmatefirst, post.inmatelast, post.dob], (err, result) => {
      if(err) throw err;

      res.locals.moment = moment;
      if(post.list == "on") {
      res.render(path.resolve('./myviews/shortprint'), {
        title: 'Database Query',
        inmates: result
        });
      } else
      res.render(path.resolve('./myviews/fullprint'), {
       title: 'Database Query',
       inmates: result
      }); 
  });
});

module.exports = router;