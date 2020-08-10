const Mongoose = require("mongoose");
const mySchema = Mongoose.Schema;
let bugSchema = new mySchema({
  Title: {
    type: String,
  },
  Description: {
    type: String,
  },
  Priority: {
    type: String,
  },
  Attachment: {
    type: String,
  },
  Assignee: {
    type: String,
  },
  Date: {
    type: Date,
  },
  owner: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  }
});
module.exports = Mongoose.model("Trackers", bugSchema);
