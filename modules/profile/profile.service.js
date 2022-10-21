const NotFoundError = require('../../utils/not-found-error');
const BadRequestError = require('../../utils/bad-request-error');
const userService = require('../user/user.service');
const Follow = require('./follow.model');

const buildProfileResponse = ({ username, bio, image, following }) => {
  return {
    profile: {
      username,
      bio,
      image: image || 'https://api.realworld.io/images/smiley-cyrus.jpg',
      following,
    },
  };
};

const getProfile = async (username, currentUserId) => {
  const user = (await userService.findUserByUsername(username))?.toJSON();

  if (!user) {
    throw new NotFoundError('There is no user with such username');
  }

  let following = false;

  if (currentUserId) {
    const follow = await Follow.findOne({
      where: {
        followerId: currentUserId,
        followedId: user.id,
      },
    });

    if (follow) {
      following = true;
    }
  }

  return { ...user, following };
};

const followUser = async (username, currentUserId) => {
  const user = (await userService.findUserByUsername(username))?.toJSON();

  if (!user) {
    throw new NotFoundError('There is no user with such username');
  }

  if (user.id === currentUserId) {
    throw new BadRequestError("You can't follow yourself");
  }

  const follow = await Follow.findOne({
    where: {
      followerId: currentUserId,
      followedId: user.id,
    },
  });

  if (!follow) {
    await Follow.create({
      followerId: currentUserId,
      followedId: user.id,
    });
  }

  return { ...user, following: true };
};

const unfollowUser = async (username, currentUserId) => {
  const user = (await userService.findUserByUsername(username))?.toJSON();

  if (!user) {
    throw new NotFoundError('There is no user with such username');
  }

  const follow = await Follow.findOne({
    where: {
      followerId: currentUserId,
      followedId: user.id,
    },
  });

  if (follow) {
    await follow.destroy();
  }

  return { ...user, following: false };
};

module.exports = { getProfile, followUser, unfollowUser, buildProfileResponse };
