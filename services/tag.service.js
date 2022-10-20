const Tag = require('../models/tag.model');

const findAll = () => {
  return Tag.findAll({ raw: true });
};

module.exports = { findAll };
