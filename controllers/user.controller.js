const userService = require('../services/user.service');
const ValidationError = require('../utils/validation-error');

const register = async (req, res) => {
  const { email, username, password } = req.body.user;

  try {
    const newUser = await userService.createUser(email, username, password);

    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(422).json(err.errorResponse);
    } else {
      console.error(err);
      res.status(500).send('Something went wrong.');
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body.user;

  try {
    const user = await userService.login(email, password);
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(422).json(err.errorResponse);
    } else {
      console.log(err);
      res.status(500).send('Something went wrong.');
    }
  }
};

const getCurrentUser = async (req, res) => {
  const user = await userService.buildUserResponse(req.user);
  res.status(200).json(user);
};

module.exports = { register, login, getCurrentUser };
