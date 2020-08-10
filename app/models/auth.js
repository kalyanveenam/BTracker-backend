let mongoose = require("mongoose");
let appschema = mongoose.Schema;
let authSchema = new appschema({
  userId: {
    type: String,
    unique: true,
  },
  authToken: {
    type: String,
    unique: true,
  },
  tokenSecret: {
    type: String,
  },
  generatedDate: {
    type: Date,
  },
});
module.exports = mongoose.model("auth", authSchema);
