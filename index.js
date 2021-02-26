const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const refreshTokenFunctions = require('./server/routerFunction');
const config = require('./configuration/config');
const auth = require('./authentication/auth');

const router = express.Router();
const app = express();

// Login API for the first time user login
router.post('/login', refreshTokenFunctions.login);

// API to generate refresh token
router.post('/token', refreshTokenFunctions.token);

router.use(auth);
// API to check login endpoint API token is expired or not 
router.get('/secure', refreshTokenFunctions.secure);

app.use(bodyParser.json())
app.use('/api', router)
app.listen(config.port || process.env.port || 3000);
