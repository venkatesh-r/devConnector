const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongo_URL");

const dbConnection = async () => {
  try {
    await mongoose.connect(db);
    console.log("monogo DB connected");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = dbConnection;
