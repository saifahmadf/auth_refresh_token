const jwt = require('jsonwebtoken');
const config = require('../configuration/config');
const tokenList = {}

const login = (req,res) => {
  const requestedData = req.body;
  const user = {
      "email": requestedData.email,
      "name": requestedData.name
  }
  // Generation of Token and refresh token for a user when he login for the first time
  const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
  const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
  const response = {
      "status": "User is logged-in",
      "token": token,
      "refreshToken": refreshToken,
  }
  tokenList[refreshToken] = response
  res.status(200).json(response);
}

// Refresh the Token
const token = (req,res) => {
    const requestedData = req.body
    // if refresh token exists
    if((requestedData.refreshToken) && (requestedData.refreshToken in tokenList)) {
        const user = {
            "email": requestedData.email,
            "name": requestedData.name
        }
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[requestedData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
}

// Check whether login time is expired or not
const secure =  (req,res) => {
  res.send('User is secured!');
}

module.exports = { 
  login, 
  token,
  secure
}