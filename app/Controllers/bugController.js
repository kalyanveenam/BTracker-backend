const Mongoose = require("mongoose");
let response = require("../Libs/responseLib");
const responseLib = require("../Libs/responseLib");
const bugModel = Mongoose.model("Trackers");
const userModel = Mongoose.model("users");
const commModel = Mongoose.model("comments");
const attachmentModel = Mongoose.model("attachments");
const watchModel = Mongoose.model("watcher");
let createBug = (req, res) => {
  const createBug = new bugModel({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    attachment: req.body.attachment,
    assignee: req.body.assignee,
    owner: req.user._id,
    reporter: req.body.reporter,
  }).save((error, data) => {
    if (data) {
      let apiResponse = response.generate(false, null, 201, data);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(true, error, 404, null);
      res.status(201).send(apiResponse);
    }
  });
};
let getAllBugs = async (req, res) => {
  let user = await userModel.findById(req.user._id);
  console.log("user->" + req.user);
  console.log(req.user);
  await user.populate("userBugs").execPopulate();
  let apiResponse = response.generate(false, null, 200, user.userBugs);
  res.send(apiResponse);
};
let getBugsById = async (req, res) => {
  let id = req.params.id;
  await bugModel.findById(id, (error, result) => {
    if (result) {
      let apiResponse = response.generate(false, null, 200, result);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(true, error, 404, null);
      res.send(apiResponse);
    }
  });
};
let updateBugs = async (req, res) => {
  let updates = Object.keys(req.body);
  try {
    let bugs = await bugModel.findById(req.params.id);
    updates.map((update) => {
      bugs[update] = req.body[update];
      bugs.save();
    });
    let apiResponse = response.generate(false, "Bug is updated", 200, bugs);
    res.send(apiResponse);

    if (!bugs) {
      let apiResponse = response.generate(true, "Bugs not found", 404, null);
      res.send(apiResponse);
    }
  } catch (error) {
    let apiResponse = response.generate(
      true,
      "Unable to rech server",
      500,
      error
    );
    res.send(apiResponse);
  }
};
let getBugsByAssignee = async (req, res) => {
  bugModel.find({ assignee: req.body.assignee }, (error, result) => {
    if (result) {
      let apiResponse = response.generate(false, null, 200, result);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(false, error, 404, null);
      res.send(apiResponse);
    }
  });
};
let createComment = (req, res) => {
  let createComm = new commModel({
    username: req.user.name,
    comment: req.body.comment,
    bugId: req.body.bugId,
  }).save((error, data) => {
    if (data) {
      let apiResponse = response.generate(false, null, 201, data);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(true, error, 404, null);
      res.status(201).send(apiResponse);
    }
  });
};
let getCommentsById = async (req, res) => {
  let tracker = await bugModel.findById(req.query.id);
  console.log("tracker->" + tracker);

  await tracker.populate("comments").execPopulate();
  let apiResponse = response.generate(false, null, 200, tracker.comments);
  res.send(apiResponse);
};
let createAttachment = (req, res) => {
  let cretateAtt = new attachmentModel({
    attachments: req.file.buffer,
    bugId: req.query.bugId,
  }).save((error, result) => {
    if (result) {
      let apiResponse = response.generate(false, null, 200, result);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(true, error, 404, null);
      res.send(apiResponse);
    }
  });
};
let getAttachmentsById = async (req, res) => {
  let tracker = await bugModel.findById(req.query.id);
  await tracker.populate("attachments").execPopulate();
  res.set("Content-type", "image/jpg");
  res.set("Access-Control-Allow-Origin", "*");

  let apiResponse = response.generate(false, null, 200, tracker.attachments);
  res.send(apiResponse);
};
let createWatcher = (req, res) => {
  let watchattr = new watchModel({
    username: req.body.username,
    bugTitle: req.body.title,
    bugPriority: req.body.priority,
    bugStatus: req.body.status,
    bugDescription: req.body.description,
    assignee: req.body.assignee,
    watchedUser: req.query.userId,
    watchedBug: req.query.bugId
  }).save((error, result) => {
    if (result) {
      let apiResponse = response.generate(false, null, 200, result);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(true, error, 404, null);
      res.send(apiResponse);
    }
  });
};
// displays all the users by current tracker 
let getWatchersByUsername = async (req, res) => {
  let bug = await bugModel.findById(req.query.id);
  console.log(bug);
  await bug.populate("watchers").execPopulate();
  let apiResponse = response.generate(false, null, 200, bug.watchers);
  res.send(apiResponse);
};
//finds a user by its id of current user , populates all the bugs marked as watched by current user
// should be displyed in dashboard 
let getWatchTrackerByuser = async (req, res) => {
  console.log(req.query.id);
  let user = await userModel.findById(req.query.id);
  console.log(user);
  await user.populate("watchedBugs").execPopulate();
  let apiResponse = response.generate(false, null, 200, user.watchedBugs);
  res.send(apiResponse);
};
module.exports = {
  createBug: createBug,
  getAllBugs: getAllBugs,
  getBugsById: getBugsById,
  updateBugs: updateBugs,
  getBugsByAssignee: getBugsByAssignee,
  createComment: createComment,
  getCommentsById: getCommentsById,
  createAttachment: createAttachment,
  getAttachmentsById: getAttachmentsById,
  createWatcher: createWatcher,
  getWatchersByUsername: getWatchersByUsername,
  getWatchTrackerByuser: getWatchTrackerByuser,
};
