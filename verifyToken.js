var jwt = require('jsonwebtoken');
var config = require('./config');

function verifyToken(req, res, next) {

  var token = req.headers['x-access-token'];
  if (!token) 
    return res.status(403).send({ statue: false, message: 'No token provided.' });

  jwt.verify(token, config.secretKey, function(err, decoded) {   
    if (err) 
      return res.status(500).send({ status: false, message: 'Failed to authenticate token.' });    

    req.user_id = decoded.id;
    next();
  });

}

module.exports = verifyToken;