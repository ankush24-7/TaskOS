const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader)
    return res.status(401).json({ error: 'User not authenticated' });
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token is invalid' });

    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;
