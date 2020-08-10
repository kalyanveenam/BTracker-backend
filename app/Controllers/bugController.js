const Mongoose = require("mongoose");
let response = require("../Libs/responseLib");
const responseLib = require("../Libs/responseLib");
const bugModel = Mongoose.model("Trackers");
const userModel= Mongoose.model('users')
let createBug = (req, res) => {
  const createBug = new bugModel({
    ...req.body,
    owner: req.user._id
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
let getAllBugs = async (req, res) => {
 
  let user = await userModel.findById(req.user._id)
  console.log("user->" + req.user);
  console.log(req.user)
 await user.populate("userBugs").execPopulate();

  res.send(user.userBugs);
};
module.exports = {
  createBug: createBug,
  getAllBugs: getAllBugs,
};
