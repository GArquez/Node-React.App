if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require("cookie-parser");

//Initialitizations

const app = express();
require('./database')
require('./strategies/LocalStrategy');
require('./strategies/JwtStrategy');
require('./util');

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}

//Middlewares

app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());


//Routes

app.use('/api/productos', require('./routes/products'));
app.use('/api/ordenes', require('./routes/orders'));
app.use('/api/usuarios', require('./routes/users'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));});
  
//Static Files
  
app.use(express.static(path.resolve(__dirname, '../client/build')));

module.exports = app
