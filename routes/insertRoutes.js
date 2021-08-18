const { lookupService } = require('dns');
const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db');
const jwt = require('jsonwebtoken');
const token = require('./indexRoutes')
title = "";
good = "";

router.get('/insert',  (req, res) => {
  res.render(path.resolve('./myviews/insert')) 
});

router.post('/insert', (req, res) => {

  let legs = { //object that saves the different leg trips
    triplegs: req.body.triplegs,
    triplegs2: req.body.triplegs2,
    triplegs3: req.body.triplegs3
  }
  let legsarray = []; //final object that stores all of the leg trips
  legsarray.push(legs.triplegs);

  legsarray.push(legs.triplegs2);
  legsarray.push(legs.triplegs3);
  legsarray.push(req.body.eagency);
  legsarray.push(req.body.oagency);
  legsarray.push(req.body.dagency);



  let finallegsarray = []; //final object that stores all of the leg trips
  finallegsarray.push(legs.triplegs);
  finallegsarray.push(legs.triplegs2);
  finallegsarray.push(legs.triplegs3);

  


  let post = { //object that saves all user input
    inmatefirst: req.body.firstname,
    inmatelast: req.body.lastname,
    inmatemiddle: req.body.middlename,
    dob: req.body.dob,
    sex: req.body.sex,
    race: req.body.race,
    adt: req.body.adt,
    warrant: req.body.warrant,
    warrant2: req.body.warrant2,
    warrant3: req.body.warrant3,
    charge: req.body.charge,
    charge2: req.body.charge2,
    charge3: req.body.charge3,
    eagency: req.body.eagency,
    oagency: req.body.oagency,
    dagency: req.body.dagency,
    tripdate: req.body.tripdate,
    tripdate2: req.body.tripdate2,
    tripdate3: req.body.tripdate3,
    triplegs: req.body.triplegs,
    triplegs2: req.body.triplegs2,
    triplegs3: req.body.triplegs3,
    legcheck: `${legsarray}`,
    finallegcheck: `${finallegsarray}`,
    notes: req.body.notes,
  }




  //first checking if an identical person exists or not
  let sql = `SELECT * FROM inmates WHERE inmatefirst = ? AND inmatelast = ? AND dob = ?`;
  let query = db.query(sql, [post.inmatefirst, post.inmatelast, post.dob], (err, result) => {
      if(err) throw err;
      
      if(result.length == 0) { //insert the user into the database if its unique
        let sql = 'INSERT INTO inmates SET ?';
        let query = db.query(sql, post, (err, result) => {
            if(err) throw err;
        });
      
        res.render(path.resolve('./myviews/insert'), {
          good: 'Successfully Entered'
        }); 
      } else {
        res.render(path.resolve('./myviews/insert'), { //personl already exits
          title: 'A user with this NAME and DOB already exists in the system'
        }); 
      }
    });
    
});



module.exports = router;

