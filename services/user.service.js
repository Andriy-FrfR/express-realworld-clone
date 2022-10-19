const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const ValidationError = require('../utils/validation-error');
const jwt = require('jsonwebtoken');

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

const createUser = async (email, username, password) => {
  const errorResponse = { errors: {} };

  let candidate = await User.findOne({ where: { email } });

  if (candidate) {
    errorResponse.errors.email = ['has already been taken'];
  }

  candidate = await User.findOne({ where: { username } });

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

  const newUser = await User.create(
    { username, email, password: hashedPassword },
    { raw: true }
  );

  return buildUserResponse(newUser);
};

const login = async (email, password) => {
  const candidate = await (await User.findOne({ where: { email } }))?.toJSON();

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

  return buildUserResponse(candidate);
};

module.exports = {
  createUser,
  login,
  buildUserResponse,
};
