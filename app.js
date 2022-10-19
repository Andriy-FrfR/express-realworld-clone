const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*Routes*/
app.use('/api', userRoutes);

module.exports = app;
