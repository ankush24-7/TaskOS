const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(400);
  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if (err) return res.sendStatus(403);
    
        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        return res.json({ accessToken });
    }
  );
};

module.exports = handleRefresh;
