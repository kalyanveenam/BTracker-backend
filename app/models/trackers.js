const mongoose = require("mongoose");
const mySchema = mongoose.Schema;
let bugSchema = new mySchema({
  bugID: {
    type: String
  },
  title: {
    type: String,
    require: true,
    
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
  },
  attachment: {
    type: String,
  },
  assignee: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "open",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});
module.exports = mongoose.model("Trackers", bugSchema);
