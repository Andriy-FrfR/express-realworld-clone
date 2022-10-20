const NotFoundError = require('../utils/not-found-error');
const userService = require('./user.service');

const buildProfileResponse = (profile) => {
  return {
    profile: {
      username: profile.username,
      bio: profile.bio,
      image:
        profile.image || 'https://api.realworld.io/images/smiley-cyrus.jpg',
      following: profile.following,
    },
  };
};

const getProfile = async (username, currentUserUsername) => {
  const user = (await userService.getUserByUsername(username)).toJSON();

  if (!user) {
    throw new NotFoundError('There is no user with such username');
  }

  const following = false;

  return { ...user, following };
};

module.exports = { getProfile, buildProfileResponse };
