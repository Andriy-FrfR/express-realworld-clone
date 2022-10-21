const express = require('express');
const cors = require('cors');
const userRoutes = require('./modules/user/user.routes');
const tagRoutes = require('./modules/tag/tag.routes');
const profileRoutes = require('./modules/profile/profile.routes');
const articleRoutes = require('./modules/article/article.routes');
const addUserFromTokenMiddleware = require('./middlewares/add-user-from-token.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addUserFromTokenMiddleware);

/*Routes*/
app.use('/api', userRoutes);
app.use('/api', tagRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/articles', articleRoutes);

module.exports = app;
