const { verify } = require('jsonwebtoken');
const User = require('../models/user.model');

const addUserFromTokenMiddleware = async (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const username = verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { username }, raw: true });
    req.user = user;
    next();
  } catch (e) {
    return next();
  }
};

module.exports = addUserFromTokenMiddleware;
