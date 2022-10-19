const authRequiredMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('Auth is required');
  }

  next();
};

module.exports = authRequiredMiddleware;
