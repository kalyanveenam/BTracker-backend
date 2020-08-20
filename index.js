let express = require("express");
let path = require("path");
let mongoose = require("mongoose");
var cors = require("cors");
var multer = require("multer");
let fs = require("fs");
let logger = require("pino")();
let routeNotFound = require("./app/Middlewares/routeValidation");
let { config } = require("./app/config/appConfig");
const { Router } = require("express");
const bodyParser = require("body-parser");
const app = express();
logger.info("hello world");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/files", express.static(__dirname + "/app/attachments"));
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
app.listen(process.env.PORT, () => {
  //mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true, useUnifiedTopology:true, useMongoClient: true} );
  if (config.env == "prod") {
    mongoose.connect(config.mongodb.url, { useNewUrlParser: true });
    mongoose.connection
      .once("open", function () {
        console.log("Conection has been made!");
      })
      .on("error", function (error) {
        console.log("Error is: ", error);
      });
  } else {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
    mongoose.connection
      .once("open", function () {
        console.log("Conection has been made!");
      })
      .on("error", function (error) {
        console.log("Error is: ", error);
      });
  }

  console.log("App is listening on " + process.env.PORT);
});
