const jwt = require('jsonwebtoken');

const generateTokens = async (user) => {
    const accessToken = await jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
    const refreshToken = await jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    return { accessToken, refreshToken };
}

module.exports = generateTokens;