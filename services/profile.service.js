const NotFoundError = require('../utils/not-found-error');
const userService = require('./user.service');
const Follow = require('../models/follow.model');

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
  const user = (await userService.findUserByUsername(username))?.toJSON();

  if (!user) {
    throw new NotFoundError('There is no user with such username');
  }

  let following = false;

  if (currentUserUsername) {
    const follow = await Follow.findOne({
      where: {
        followerUsername: currentUserUsername,
        followedUsername: username,
      },
    });

    if (follow) {
      following = true;
    }
  }

  return { ...user, following };
};

const followUser = async (username, currentUserUsername) => {
  const user = (await userService.findUserByUsername(username))?.toJSON();

  if (!user) {
    throw new NotFoundError('There is no user with such username');
  }

  const follow = await Follow.findOne({
    where: {
      followerUsername: currentUserUsername,
      followedUsername: username,
    },
  });

  if (!follow) {
    await Follow.create({
      followerUsername: currentUserUsername,
      followedUsername: username,
    });
  }

  return { ...user, following: true };
};

const unfollowUser = async (username, currentUserUsername) => {
  const user = (await userService.findUserByUsername(username))?.toJSON();

  if (!user) {
    throw new NotFoundError('There is no user with such username');
  }

  const follow = await Follow.findOne({
    where: {
      followerUsername: currentUserUsername,
      followedUsername: username,
    },
  });

  if (follow) {
    await follow.destroy();
  }

  return { ...user, following: false };
};

module.exports = { getProfile, followUser, unfollowUser, buildProfileResponse };
