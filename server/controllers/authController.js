const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateTokens = require('../utils/generateTokens');

const handleRegistration = async (req, res) => {
  const { name, username, email, color, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email }).lean().exec();
  if (emailAlreadyExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const usernameAlreadyExists = await User.findOne({ username }).lean().exec();
  if (usernameAlreadyExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      email,
      color,
      password: hashedPassword
    });
    
    const { accessToken, refreshToken } = generateTokens(newUser);
    newUser.refreshToken = refreshToken;
    await newUser.save();
    
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ message: 'User created successfully', accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const handleLogin = async (req, res) => {
  const { input, password } = req.body;
  if (!input || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = input.includes('@') 
    ? await User.findOne({ email: input }).exec() 
    : await User.findOne({ username: input }).exec();

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong Password' });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ message: 'User logged in successfully', accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const handleGuestAccess = async (req, res) => {
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
        { expiresIn: '15min' }
      );
      return res.json({ accessToken });
    }
  );
}

module.exports = { 
  handleRegistration, 
  handleLogin,
  handleGuestAccess
};
