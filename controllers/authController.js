const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

  
    const validUsername = 'kwizera';
    const validPassword = '1234';

 
    if (username !== validUsername || password !== validPassword) {
      return res.status(401).json({
        message: 'Invalid username or password',
      });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error during login',
      error: error.message,
    });
  }
};


exports.protect = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        message: 'No authentication token, access denied',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token, access denied',
      error: error.message,
    });
  }
};
