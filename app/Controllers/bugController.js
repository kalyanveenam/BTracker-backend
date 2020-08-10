let response = require("../Libs/responseLib");
const Mongoose = require("mongoose");

let createBug = (req, res) => {
  res.send("Create tracker");
};
module.exports = { createBug: createBug };
