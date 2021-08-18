const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');
const insertRoutes = require('./routes/insertRoutes.js');
const cancelRoutes = require('./routes/cancelRoutes.js');
const queryRoutes = require('./routes/queryRoutes');
const indexRoutes = require('./routes/indexRoutes');
const modifyRoutes = require('./routes/modifyRoutes');
const newuserRoutes = require('./routes/newuserRoutes');
const moment = require("moment");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { promisify } = require('util');




//hosting the server
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`)); 

// setting up view engine
app.set('view engine', 'ejs')
app.set('views', 'myviews');
app.set('myviews', path.join(__dirname, 'myviews'))


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //used for static image
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(insertRoutes);
app.use(cancelRoutes);
app.use(queryRoutes);
app.use(indexRoutes);
app.use(modifyRoutes);
app.use(newuserRoutes);

app.get('/home', (req, res) => {
  res.render(path.resolve('./myviews/home'));
});

app.get('/logs', (req, res) => {
  res.render(path.resolve('./myviews/logs'));
});



app.use((req, res) => {   //keep this at the bottom
  res.status(404).render(path.resolve('./myviews/404'));
});

