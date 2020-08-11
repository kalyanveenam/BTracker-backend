const mongoose = require("mongoose");
const mySchema = mongoose.Schema;
let bugSchema = new mySchema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
  },
  attachment: {
    type: String,
  },
  assignee: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
});
module.exports = mongoose.model("Trackers", bugSchema);
