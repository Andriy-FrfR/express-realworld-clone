const NotFoundError = require('../../utils/not-found-error');
const BadRequestError = require('../../utils/bad-request-error');
const profileService = require('./profile.service');

const getProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfile(
      req.params['username'],
      req['user']?.id
    );
    const profileResponse = profileService.buildProfileResponse(profile);

    res.status(200).json(profileResponse);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).end(err.message);
    } else {
      console.log(err);
      res.status(500).end('Something went wrong.');
    }
  }
};

const followUser = async (req, res) => {
  try {
    const profile = await profileService.followUser(
      req.params.username,
      req.user.id
    );
    const profileResponse = profileService.buildProfileResponse(profile);

    res.status(200).json(profileResponse);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).end(err.message);
    } else if (err instanceof BadRequestError) {
      res.status(400).end(err.message);
    } else {
      console.error(err);
      res.status(500).end('Something went wrong.');
    }
  }
};

const unfollowUser = async (req, res) => {
  try {
    const profile = await profileService.unfollowUser(
      req.params.username,
      req.user.id
    );
    const profileResponse = profileService.buildProfileResponse(profile);

    res.status(200).json(profileResponse);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).end(err.message);
    } else {
      console.error(err);
      res.status(500).end('Something went wrong.');
    }
  }
};

module.exports = { getProfile, followUser, unfollowUser };
