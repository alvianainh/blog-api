const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const Joi = require('joi');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token is invalid or expired' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization header is missing' });
  }
};

const register = async (req, res) => {
  const { email, password, name } = req.body;

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
    res.status(500).send('Internal Server Error');
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return next({ status: 400, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next({ status: 400, message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next({ status: 500, message: 'Internal Server Error' });
  }
};

module.exports = { register, login, authenticateJWT };
