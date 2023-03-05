const mongoose = require("mongoose");

// const MONGO_URL =
//   "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

const MONGO_URL =
  "mongodb+srv://omkardevrukhkar0:xXqIkV6UNGegWSMF@elred.wtabeyp.mongodb.net/test?authSource=admin&replicaSet=atlas-h54895-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
// console.log(process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("App starting error: ", err);
    process.exit(1);
  });
