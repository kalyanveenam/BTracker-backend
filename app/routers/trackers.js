const apiConfig = require("../config/appConfig");
let auth = require("../Middlewares/authVerify");
let bugController = require("../Controllers/bugController");
const bugRoutes = (app) => {
  app.post(
    apiConfig.config.apiVersion + "/create/bug",
    auth.authValidation,
    bugController.createBug
  );
  app.get(
    apiConfig.config.apiVersion + "/bugs",
    auth.authValidation,
    bugController.getAllBugs
  );
  app.get(apiConfig.config.apiVersion + "/bugs/:id", bugController.getBugsById);
  app.post(apiConfig.config.apiVersion+ "/bugs/update/:id",bugController.updateBugs)
};
/**
 * @api {post} /api/v1/create/bug

 * @apiGroup Bugs
 *
 * @apiParam {String} title Title of bug.
 *@apiParam {String} description of bug.
 * @apiParam {String} priority of bug.
 *@apiParam {String} Attachments .
  @apiParam {String} assignee of bug.
 *@apiParam {String} owner Unique ID of owner

 * @apiSuccessExample {json} Success-Response:{
    "error": true,
    "message": {
        "_id": "5f3190ff35208c13b4104562",
        "Title": "My trckerr",
        "Description": "UX is not user friendly in ",
        "Priority": "p2",
        "Assignee": "karthik",
        "owner": "5f318c6ef4c0e833a02d77ab",
        "createdDate": "2020-08-10T18:25:03.251Z",
        "__v": 0
    },
    "status": 404,
    "data": null
}
 */
module.exports = { bugRoutes: bugRoutes };
