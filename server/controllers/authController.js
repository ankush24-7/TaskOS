const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateTokens = require('../utils/generateTokens');

const handleRegistration = async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExists = await User.findOne({ email }).exec();
  if (alreadyExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    const { accessToken, refreshToken } = await generateTokens(newUser);
    newUser.refreshToken = refreshToken;
    await newUser.save();
    
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 86400000,
    });
    return res.json({ message: 'User created successfully', accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Please enter all fields' });

  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(404).json({ message: 'User does not exist' });

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const { accessToken, refreshToken } = await generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 86400000,
    });
    return res.json({ message: 'User logged in successfully', accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { handleRegistration, handleLogin };
