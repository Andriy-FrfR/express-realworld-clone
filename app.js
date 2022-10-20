const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const tagRoutes = require('./routes/tag.routes');
const profileRoutes = require('./routes/profile.routes');
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

module.exports = app;
