let express = require("express");
let path = require("path");
let mongoose = require("mongoose");
var cors = require("cors");
let fs = require("fs");

let routeNotFound = require("./app/Middlewares/routeValidation");
let { config } = require("./app/config/appConfig");
const { Router } = require("express");
const bodyParser = require("body-parser");
const app = express();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
let modelPath = path.join(__dirname, "./app/models");
fs.readdirSync(modelPath).forEach(function (file) {
  if (~file.indexOf(".js")) {
    require(modelPath + "/" + file);
  }
});
let routerPath = path.join(__dirname, "./app/routers");
var files = "";
fs.readdirSync(routerPath).forEach(function (file) {
  files += file + ",";
});
files.slice(0, -1);
if (~files.split(",")[0].indexOf(".js") && files.split(",")[1].indexOf(".js")) {
  let userRoute = require(path.join(routerPath, files.split(",")[1]));
  let bugRoute = require(routerPath + "/" + files.split(",")[0]);
  userRoute.userRoutes(app);
  bugRoute.bugRoutes(app);
}

files = files.substring(0, files.length - 1);
console.log("fi " + files);
app.use(routeNotFound.routeNotFound);
console.log(routerPath);
app.listen(config.PORT, () => {
  mongoose.connect(config.mongodb.url, { useMongoClient: true });
  console.log("App is listening on " + config.PORT);
});
