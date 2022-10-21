const { verify } = require('jsonwebtoken');
const User = require('../modules/user/user.model');

const addUserFromTokenMiddleware = async (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const id = verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    req.user = user;
    next();
  } catch (e) {
    return next();
  }
};

module.exports = addUserFromTokenMiddleware;
