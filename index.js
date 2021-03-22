var express = require('express');
var app = express();

var router = require('./router');

var port = process.env.PORT || 3000;
const db = require("./db");

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.status(200).send('API works.');
});

app.use('/api', router);


app.listen(port, function () {
  console.log('Server is running on PORT',port);
});
