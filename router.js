const express = require('express');
const router = express.Router();
const userController = require('./controller/userController');
const verifyToken = require('./verifyToken');
var VerifyToken = require('./verifyToken');

router.post('/user' ,async function (req, res) { 
  var reqData = req.body;
  var data = await userController.registerUser(reqData);
  res.send(JSON.stringify(data));
});

router.get('/user' ,verifyToken,async function (req, res) { 
  var reqData = req.body;
  var data = await userController.getUserDetails(reqData);
  res.send(JSON.stringify(data));
});

router.get('/login' ,async function (req, res) { 
  var reqData = req.body;
  var data = await userController.userLogin(reqData);
  res.send(JSON.stringify(data));
});

module.exports = router;