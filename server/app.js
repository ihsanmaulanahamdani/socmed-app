require('dotenv').config();
const express  = require('express');
const logger   = require('morgan');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@ds217671.mlab.com:17671/media-social`);

const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index.router');
const postRouter  = require('./routes/post.router');

const app = express();
const db  = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connect to Mongoose Database');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/posts', postRouter);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});