const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const myRouter = require('./routes/myRouter');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', myRouter);
app.use("/no", myRouter);

module.exports = app;