let mongoose = require("mongoose");
let watchschema = mongoose.Schema;
let watcherSchema = new watchschema({
  username: {
    type: String,
    require: true,
  },
  bugTitle: {
    type: String,
    require: true,
  },
  bugPriority: {
    type: String,
    require: true,
  },
  bugStatus: {
    type: String,
    require: true,
  },
  bugDescription: {
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
});
module.exports = mongoose.model("watcher", watcherSchema);
