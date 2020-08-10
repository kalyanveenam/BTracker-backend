const apiConfig = require("../config/appConfig");
let auth = require("../Middlewares/authVerify");
let bugController = require('../Controllers/bugController');
const bugRoutes = (app) => {
  app.post(apiConfig.config.apiVersion + "/createBug",bugController.createBug );
};

module.exports = { bugRoutes: bugRoutes };
