let mongoose = require("mongoose");
let watchschema = mongoose.Schema;
let watcherSchema = new watchschema({
  username: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  assignee: {
    type: String,
    require: true,
  },
  watchedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
  },
  watchedBug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trackers",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("watcher", watcherSchema);
