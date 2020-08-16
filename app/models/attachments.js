const mongoose = require("mongoose");
let mySchema = mongoose.Schema;

let attachmentSchema = new mySchema({
  attachments: {
    type: Buffer,
  },
  bugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bugSchema",
  },
});

module.exports = mongoose.model("attachments", attachmentSchema);
