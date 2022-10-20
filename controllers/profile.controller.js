const NotFoundError = require('../utils/not-found-error');
const profileService = require('../services/profile.service');

const getProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfile(
      req.params['username'],
      req['user']?.username
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

module.exports = { getProfile };
