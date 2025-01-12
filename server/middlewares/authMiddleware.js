const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request
  
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
const prof = async (req, res, next) => {
  try {

    const user = await User.findById(req.user.userId);
    
    if (user.role !== 'professor') {
      return res.status(400).json({

        error: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

module.exports = {authMiddleware,prof}
