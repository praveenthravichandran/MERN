var express = require('express');
const connectDb = require('./db');

var app = express();
const port = 4000;
connectDb();

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/sayhi', (req, res) => {
    res.send('All is well');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});