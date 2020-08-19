const mongoose = require("mongoose");
const mySchema = mongoose.Schema;
let bugSchema = new mySchema({
  bugID: {
    type: String,
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
  reporter: {
    type: String,
    required: true,
  },
});
bugSchema.virtual("comments", {
  ref: "comments",
  localField: "_id",
  foreignField: "bugId",
});
bugSchema.virtual("attachments", {
  ref: "attachments",
  localField: "_id",
  foreignField: "bugId",
});
bugSchema.virtual("watchers", {
  ref: "watcher",
  localField: "_id",
  foreignField: "watchedBug",
});
module.exports = mongoose.model("Trackers", bugSchema);
