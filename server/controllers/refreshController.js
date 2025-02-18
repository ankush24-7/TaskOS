const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(400).json({ message: "Cookie or token not found" });
  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.status(403).json({ message: "User not found" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15s' }
        );
        return res.json({ accessToken });
    }
  );
};

module.exports = handleRefresh;
