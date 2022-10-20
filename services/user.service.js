const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const ValidationError = require('../utils/validation-error');
const jwt = require('jsonwebtoken');

const findUserByUsername = async (username) => {
  return User.findByPk(username);
};

const buildUserResponse = async ({ username, email, bio, image }) => {
  const token = await jwt.sign(username, process.env.JWT_SECRET);

  const userResponse = {
    user: {
      username,
      email,
      bio,
      image: image || 'https://api.realworld.io/images/smiley-cyrus.jpg',
      token,
    },
  };

  return userResponse;
};

const createUser = async ({ email, username, password }) => {
  const errorResponse = { errors: {} };

  let candidate = await User.findOne({ where: { email } });

  if (candidate) {
    errorResponse.errors.email = ['has already been taken'];
  }

  candidate = await findUserByUsername(username);

  if (candidate) {
    errorResponse.errors.username = ['has already been taken'];
  }

  if (errorResponse.errors.email || errorResponse.errors.username) {
    throw new ValidationError(
      'Email and username have to be unique',
      errorResponse
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return (newUser = await User.create(
    { username, email, password: hashedPassword },
    { raw: true }
  ));
};

const login = async ({ email, password }) => {
  const candidate = await User.findOne({ where: { email }, raw: true });

  if (!candidate) {
    throw new ValidationError('Email or password is invalid', {
      errors: { 'email or password': 'is invalid' },
    });
  }

  const arePasswordsSame = await bcrypt.compare(password, candidate.password);

  if (!arePasswordsSame) {
    throw new ValidationError('Email or password is invalid', {
      errors: { 'email or password': 'is invalid' },
    });
  }

  return candidate;
};

const updateUser = async (user, { email, username, password, image, bio }) => {
  if (email) {
    user.email = email;
  }

  if (username) {
    user.username = username;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  if (image) {
    user.image = image;
  }

  if (bio) {
    user.bio = bio;
  }

  return user.save();
};

module.exports = {
  createUser,
  login,
  updateUser,
  buildUserResponse,
  findUserByUsername,
};
