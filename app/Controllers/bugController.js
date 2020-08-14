const Mongoose = require("mongoose");
let response = require("../Libs/responseLib");
const responseLib = require("../Libs/responseLib");
const bugModel = Mongoose.model("Trackers");
const userModel = Mongoose.model("users");
let createBug = (req, res) => {
  const createBug = new bugModel({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    attachment: req.body.attachment,
    assignee: req.body.assignee,
    owner: req.user._id,
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
  await bugModel.findById(id, (error,result ) => {
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

module.exports = {
  createBug: createBug,
  getAllBugs: getAllBugs,
  getBugsById: getBugsById,
  updateBugs: updateBugs,
};
