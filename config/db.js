const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongo_URL");

const dbConnection = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("monogo DB connected");
  } catch (err) {
    console.log(err.message);
    //exit from failure
    process.exit(1);
  }
};

module.exports = dbConnection;
