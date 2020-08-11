const Mongoose = require("mongoose");
let response = require("../Libs/responseLib");
const responseLib = require("../Libs/responseLib");
const bugModel = Mongoose.model("Trackers");
const userModel = Mongoose.model("users");
let createBug = (req, res) => {
  const createBug = new bugModel({
    ...req.body,
    owner: req.user._id,
  }).save((data, error) => {
    if (error) {
      let apiResponse = response.generate(true, error, 404, null);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(false, null, 200, data);
      res.send(apiResponse);
    }
  });
};
let getAllBugs = (req, res) => {
  userModel.findById(req.user._id);

  userModel
    .findOne({ _id: req.user._id })
    .populate("userBugs")
    .exec(function (err, bugs) {
      if (err) throw err;
      res.send(bugs);
    });
};
module.exports = {
  createBug: createBug,
  getAllBugs: getAllBugs,
};
