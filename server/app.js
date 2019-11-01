const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const knightsController = require('./src/controllers/knightsController');
const weaponsController = require('./src/controllers/weaponsController');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

mongoose.connect('mongodb+srv://admin:6LOnKpCe70EBupVs@cluster0-hgehq.mongodb.net/petragold?retryWrites=true&w=majority');

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/knights', knightsController);
app.use('/weapons', weaponsController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
