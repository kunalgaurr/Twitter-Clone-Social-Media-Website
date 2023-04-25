const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) =>
      console.log(`MongoDB Connected: ${data.connection.host}`.bold.cyan)
    )
    .catch((error) => console.log(error));
};

module.exports = connectDB;
