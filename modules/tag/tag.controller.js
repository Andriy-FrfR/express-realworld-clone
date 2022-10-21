const tagService = require('./tag.service');

const getTags = async (req, res) => {
  try {
    const tags = (await tagService.findAll()).map((tag) => tag.name);
    res.json({ tags });
  } catch (err) {
    console.error(err);
    res.status(500).end('Something went wrong.');
  }
};

module.exports = { getTags };
