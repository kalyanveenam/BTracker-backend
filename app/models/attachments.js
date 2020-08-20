const mongoose = require("mongoose");
let mySchema = mongoose.Schema;

let attachmentSchema = new mySchema({
  attachment: {
    type: String,
  },
  bugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bugSchema",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }
});

module.exports = mongoose.model("attachments", attachmentSchema);
