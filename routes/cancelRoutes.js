const express = require('express');
const { copyFileSync } = require('fs');
const router = express.Router();
const path = require('path');
const db = require('../db');

bad = "";
good = "";



router.get('/cancel', (req, res) => {
  res.render(path.resolve('./myviews/cancel'));
});


router.post('/cancel', (req, res) => {
  let post = {
    inmatefirst: req.body.firstname,
    inmatelast: req.body.lastname,
    dob: req.body.dob,
  }

  let sql = `SELECT * FROM inmates WHERE inmatefirst = ? AND inmatelast = ? AND dob = ?`;
  let query = db.query(sql, [post.inmatefirst, post.inmatelast, post.dob], (err, result) => {
      if(err) throw err;
      if(result.length != 0) { //if person is found populate and update thier query
        res.render(path.resolve('./myviews/cancel'), {
          good: 'Person Found -  Information Has Been Deleted',
        }); 
        let sql = 'DELETE FROM inmates WHERE inmatefirst = ? AND inmatelast = ? AND dob = ?';
        let query = db.query(sql, [post.inmatefirst, post.inmatelast, post.dob], (err, result) => {
            if(err) throw err;
        });

      } else {
        res.render(path.resolve('./myviews/cancel'), {
          bad: 'That Person Does Not Exist'
        }); 
      }

  });
});





module.exports = router;
