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

module.exports = buildUserResponse;
