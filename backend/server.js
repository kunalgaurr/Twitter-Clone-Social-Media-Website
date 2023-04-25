const express = require('express');
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/database');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

dotenv.config({ path: 'backend/config/config.env' });

const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const commentRoutes = require('./routes/commentRoutes');

connectDB();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(errorHandler);
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/tweet', tweetRoutes);
app.use('/api/comment', commentRoutes);

const server = app.listen(
  PORT,
  console.log(`The server is running on http://localhost:${PORT}`.bold.yellow)
);
