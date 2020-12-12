const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require('./database');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/cities', require('./routes/cities'));
app.use('/weather', require('./routes/weather'));

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});

db.query('SELECT NOW()', (err, res) => {
    if (err.error)
    return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}.`);
});

module.exports = app;