const jwt = require('jsonwebtoken')
const config = require('../configuration/config')

module.exports = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  // Decoding the token
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
        }
      req.decoded = decoded;
      next();
    });
  } else {
    // Error when there is no token
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}