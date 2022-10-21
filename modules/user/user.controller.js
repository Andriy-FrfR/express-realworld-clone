const userService = require('./user.service');
const ValidationError = require('../../utils/validation-error');

const register = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body.user);
    const userResponse = await userService.buildUserResponse(newUser);
    res.status(201).json(userResponse);
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
  try {
    const user = await userService.login(req.body.user);
    const userResponse = await userService.buildUserResponse(user);
    res.status(200).json(userResponse);
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
  try {
    const userResponse = await userService.buildUserResponse(req.user);
    res.status(200).json(userResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong.');
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.user, req.body.user);
    const userResponse = await userService.buildUserResponse(updatedUser);
    res.status(200).json(userResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong.');
  }
};

module.exports = { register, login, getCurrentUser, updateUser };
