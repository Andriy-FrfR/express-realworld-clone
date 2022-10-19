const authRequiredMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).end('Auth is required');
  }

  next();
};

module.exports = authRequiredMiddleware;
