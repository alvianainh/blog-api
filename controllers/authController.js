const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const Joi = require('joi');

const register = async (req, res) => {
  const { email, password, name } = req.body;

  // Validasi input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
  });

  const { error } = schema.validate({ email, password, name });
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) return res.status(400).send('User already exists');

    const newUser = await userModel.registerUser(email, password, name);
    res.status(201).send({ message: 'User created', user: newUser });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findUserByEmail(email);
  if (!user) return res.status(400).send('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const getProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { register, login, getProfile };
