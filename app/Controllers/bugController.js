const Mongoose = require("mongoose");
let response = require("../Libs/responseLib");
const bugModel = Mongoose.model("Trackers");
const userModel = Mongoose.model("users");
const commModel = Mongoose.model("comments");
const attachmentModel = Mongoose.model("attachments");
const watchModel = Mongoose.model("watcher");
const multer = require("multer");
const path = require("path");
const attachments = require("../models/attachments");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../attachments/"));
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

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
  let apiResponse = response.generate(false, null, 200, tracker.attachments);
  res.send(apiResponse);
};
let createWatcher = (req, res) => {
  let watchattr = new watchModel({
    username: req.body.username,
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status,
    description: req.body.description,
    assignee: req.body.assignee,
    watchedUser: req.query.userId,
    watchedBug: req.query.bugId,
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
  
  await bug.populate("watchers").execPopulate();
  let apiResponse = response.generate(false, null, 200, bug.watchers);
  res.send(apiResponse);
};
//finds a user by its id of current user , populates all the bugs marked as watched by current user
// should be displyed in dashboard
let getWatchTrackerByuser = async (req, res) => {
  
  let user = await userModel.findById(req.query.id);
  
  await user.populate("watchedBugs").execPopulate();
  let apiResponse = response.generate(false, null, 200, user.watchedBugs);
  res.send(apiResponse);
};
let uploadAttachment = (req, res) => {
  let upload = multer({ storage: storage }).single("attachment");
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    

    // Display uploaded image for user validation
    var response = {};

    res.status(200).send(JSON.stringify(response));
  });
};
let storeAttachments = (req, res) => {
  new attachmentModel({
    attachment: req.body.name,
    bugId: req.query.bugId,
    userId: req.query.userId,
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
let removeFromWatchList = async (req, res) => {
  await watchModel.findOneAndDelete(
    { title: req.body.title },
    (error, result) => {
      if (result) {
        let apiResponse = response.generate(false, null, 200, response);
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(true, error, 404, null);
        res.send(apiResponse);
      }
    }
  );
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
  uploadAttachment: uploadAttachment,
  storeAttachments: storeAttachments,
  removeFromWatchList: removeFromWatchList,
};
