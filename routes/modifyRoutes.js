const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db');
const moment = require("moment");


title = "";
good = "";
first = "";
last = "";
dob = "";
sex = "";
race = "";
adt = "";
warrant = "";
charge = "";
entry = "";
origin = "";
destination = "";
tripdate = "";
tripleg = "";
notes = "";


router.get('/modify', (req, res) => {
  res.render(path.resolve('./myviews/modify'));
});

router.post('/modify', (req, res) => {

  let search = {
    first: req.body.sfirst,
    last: req.body.slast,
    dob: req.body.sdob
  }
  let legs = {
    triplegs: req.body.triplegs,
    triplegs2: req.body.triplegs2,
    triplegs3: req.body.triplegs3
  }
  let legsarray = [];
  legsarray.push(legs.triplegs);
  legsarray.push("");
  legsarray.push(legs.triplegs2);
  legsarray.push("");
  legsarray.push(legs.triplegs3);
  let post = {
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
    notes: req.body.notes,
  }

  let sql = `SELECT * FROM inmates WHERE inmatefirst = ? AND inmatelast = ? AND dob = ?`;
  let query = db.query(sql, [search.first, search.last, search.dob], (err, result) => {
      if(err) throw err;
      if(result.length != 0) { //if person is found populate and update thier query
        res.render(path.resolve('./myviews/modify'), {
          good: 'Person Found -  Information Has Been Updated',
          first: result[0].inmatefirst,
          last: result[0].inmatelast,
          dob: result[0].dob,
          sex: result[0].sex,
          race: result[0].race,
          adt: result[0].adt,
          warrant: result[0].warrant,
          charge: result[0].charge,
          entry: result[0].eagency,
          origin: result[0].oagency,
          destination: result[0].dagency,
          tripdate: result[0].tripdate,
          tripleg: result[0].tripleg,
          notes: result[0].notes,
        }); 
        
        //update
        

        let sql = `UPDATE inmates SET ? WHERE inmatefirst = "${search.first}" AND inmatelast = "${search.last}"`;
        let query = db.query(sql, post, (err, result) => {
            if(err) throw err;
        });
      


      } else {
        res.render(path.resolve('./myviews/modify'), {
          title: 'That Person Does Not Exist'
        }); 
      }
    });
});






module.exports = router;