const mongoose = require("mongoose");

const mongoConnect = () => {
  const dbLink = process.env.MONGO_URL;
  return mongoose.connect(dbLink);
};

module.exports = mongoConnect;
