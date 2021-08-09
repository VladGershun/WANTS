const express = require('express');
const { copyFileSync } = require('fs');
const router = express.Router();
const path = require('path');
const db = require('../db');

//initilaizing strings for good and bad request
bad = "";
good = "";


//get route for cancel page
router.get('/cancel', (req, res) => {
  res.render(path.resolve('./myviews/cancel'));
});

//post method for cancelling inmate
router.post('/cancel', (req, res) => {
  let post = { //saving user input into post array
    inmatefirst: req.body.firstname,
    inmatelast: req.body.lastname,
    dob: req.body.dob,
  }
  //creating a query of whether the inmate entered exists or not
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

      } else { //if person is not found return not found screen
        res.render(path.resolve('./myviews/cancel'), {
          bad: 'That Person Does Not Exist'
        }); 
      }

  });
});





module.exports = router;
