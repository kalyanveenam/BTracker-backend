const Mongoose = require("mongoose");
const mySchema = Mongoose.Schema;
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
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
});
module.exports = Mongoose.model("Trackers", bugSchema);
