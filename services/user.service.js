const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const ValidationError = require('../utils/validation-error');
const buildUserResponse = require('../utils/build-user-response');

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

  const newUser = await (
    await User.create({ username, email, password: hashedPassword })
  ).toJSON();

  return buildUserResponse(newUser);
};

const login = async (email, password) => {
  const candidate = await (await User.findOne({ where: { email } }))?.toJSON();

  if (candidate) {
    const arePasswordsSame = await bcrypt.compare(password, candidate.password);

    if (arePasswordsSame) {
      return buildUserResponse(candidate);
    }
  }

  throw new ValidationError('Email or password is invalid', {
    errors: { 'email or password': 'is invalid' },
  });
};

module.exports = {
  createUser,
  login,
};
