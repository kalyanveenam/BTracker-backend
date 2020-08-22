const apiConfig = require("../config/appConfig");
let auth = require("../Middlewares/authVerify");
let bugController = require("../Controllers/bugController");
var multer = require("multer");
var upload = multer();

const bugRoutes = (app) => {
  app.post(
    apiConfig.config.apiVersion + "/create/attachment",
    auth.authValidation,
    upload.single("attachments"),
   
    bugController.createAttachment
  );
/**
 * @api {post} /api/v1/create/attachment
 * @apiGroup Attachments
 *
 * @apiParam {form-data} Attachment
 *@apiParam {string} bugId-query params

 * @apiSuccessExample {json} Success-Response:{
   {
    "error": false,
    "message": null,
    "status": 200,
    "data": {
        "_id": "5f41539e79639243580c3d70",
        "bugId": "5f41534a79639243580c3d6f",
        "__v": 0
    }
}
 */





  app.get(
    apiConfig.config.apiVersion + "/get/attachments",

    bugController.getAttachmentsById
  );

  app.post(
    apiConfig.config.apiVersion + "/create/bug",
    auth.authValidation,
    bugController.createBug
  );

  /**
 * @api {post} /api/v1/create/bug",
 * @apiGroup Tracker
 *
 * @apiParam {string} title
 *  @apiParam {string} description
 *  @apiParam {string} priority
 *  @apiParam {string} Attachment
 *  @apiParam {string} assignee
 *  @apiParam {string} reporter

 * @apiSuccessExample {json} Success-Response:{
    "error": false,
    "message": null,
    "status": 201,
    "data": {
        "status": "open",
        "_id": "5f41534a79639243580c3d6f",
        "title": "karthik trckerr2",
        "description": "UX is not user friendly in ",
        "priority": "p2",
        "assignee": "karthik",
        "owner": "5f41533479639243580c3d6d",
        "reporter": "kalyan2",
        "createdDate": "2020-08-22T17:18:02.205Z",
        "__v": 0
    }
}
 */
  app.get(
    apiConfig.config.apiVersion + "/bugs",
    auth.authValidation,
    bugController.getAllBugs
  );

/**
 * @api {get} /api/v1/bugs",
 * @apiGroup Tracker
 *
 * @apiParam {string} Authorization token


 * @apiSuccessExample {json} Success-Response:{
    "error": false,
    "message": null,
    "status": 200,
    "data": [
        {
            "status": "open",
            "_id": "5f40debf79639243580c3d59",
            "title": "karthik trckerr",
            "description": "UX is not user friendly in ",
            "priority": "p2",
            "assignee": "karthik",
            "owner": "5f40c8ea3682d647fc55b0be",
            "reporter": "kalyan2",
            "createdDate": "2020-08-22T09:00:47.549Z",
            "__v": 0
        },
        {
            "status": "open",
            "_id": "5f40dedb79639243580c3d5a",
            "title": "karthik trckerr2",
            "description": "UX is not user friendly in ",
            "priority": "p2",
            "assignee": "karthik",
            "owner": "5f40c8ea3682d647fc55b0be",
            "reporter": "kalyan2",
            "createdDate": "2020-08-22T09:01:15.072Z",
            "__v": 0
        }
    ]
}
    
 */



  app.get(apiConfig.config.apiVersion + "/bugs/:id", bugController.getBugsById);
  app.post(
    apiConfig.config.apiVersion + "/bugs/update/:id",
    bugController.updateBugs
  );

/**
 * @api {get} /api/v1/bugs?id=",
 * @apiGroup Tracker
 *
 * @apiParam {string} Authorization token
 @apiParam {id} Bug ID to update

 * @apiSuccessExample {json} Success-Response:{
    "error": false,
    "message": null,
    "status": 200,
    "data": [
        {
            "status": "open",
            "_id": "5f40debf79639243580c3d59",
            "title": "karthik trckerr",
            "description": "UX is not user friendly in ",
            "priority": "p2",
            "assignee": "karthik",
            "owner": "5f40c8ea3682d647fc55b0be",
            "reporter": "kalyan2",
            "createdDate": "2020-08-22T09:00:47.549Z",
            "__v": 0
        },
      
    ]
}
    
 */


  app.post(
    apiConfig.config.apiVersion + "/bugs/sort/assignee",
    auth.authValidation,
    bugController.getBugsByAssignee
  );


/**
 * @api {get} /api/v1/bugs/sort/assignee",
 * @apiGroup Tracker
 *
 * @apiParam {string} Authorization token
 @apiParam {string} Assignee name

 * @apiSuccessExample {json} Success-Response:{
    "error": false,
    "message": null,
    "status": 200,
    "data": [
        {
            "status": "open",
            "_id": "5f40debf79639243580c3d59",
            "title": "karthik trckerr",
            "description": "UX is not user friendly in ",
            "priority": "p2",
            "assignee": "karthik",
            "owner": "5f40c8ea3682d647fc55b0be",
            "reporter": "kalyan2",
            "createdDate": "2020-08-22T09:00:47.549Z",
            "__v": 0
        },
      
    ]
}
    
 */




  app.post(
    apiConfig.config.apiVersion + "/bugs/comments",
    auth.authValidation,
    bugController.createComment
  );


/**
 * @api {get} /api/v1/bugs/comments",
 * @apiGroup Tracker
 *
 * @apiParam {string} Authorization token
 @apiParam {string} Assignee name

 * @apiSuccessExample {json} Success-Response:{
    "error": false,
    "message": null,
    "status": 200,
    "data": [
        {
            "status": "open",
            "_id": "5f40debf79639243580c3d59",
            "title": "karthik trckerr",
            "description": "UX is not user friendly in ",
            "priority": "p2",
            "assignee": "karthik",
            "owner": "5f40c8ea3682d647fc55b0be",
            "reporter": "kalyan2",
            "createdDate": "2020-08-22T09:00:47.549Z",
            "__v": 0
        },
      
    ]
}
    
 */





  app.get(
    apiConfig.config.apiVersion + "/bugs/comments/all",
    auth.authValidation,
    bugController.getCommentsById
  );

/**
 * @api {get} /api/v1/bugs/comments/all",
 * @apiGroup Tracker
 *
 * @apiParam {string} Authorization token
 @apiParam {string} bugId


 */



  app.post(
    apiConfig.config.apiVersion + "/add/watcher",
    auth.authValidation,
    bugController.createWatcher
  );
  

/**
 * @api {post} /api/v1/add/watcher",
 * @apiGroup Tracker
 *
 * @apiParam {string} Authorization token
 @apiParam {string} bugId

 *
   * @apiSuccessExample {json} Success-Response:{
   {
    "error": false,
    "message": null,
    "status": 200,
    "data": {
        "_id": "5f40e19579639243580c3d5e",
        "username": "kalyan2",
        "title": "test title",
        "priority": "P1",
        "status": "open",
        "description": "this is sample description",
        "assignee": "kalyan",
        "watchedUser": "5f40c8ea3682d647fc55b0be",
        "watchedBug": "5f40debf79639243580c3d59",
        "createdDate": "2020-08-22T09:12:53.846Z",
        "__v": 0
    }
}
} 
 */







  app.get(
    apiConfig.config.apiVersion + "/get/bugsByUserId",
    auth.authValidation,
    bugController.getWatchTrackerByuser
  );
/**
 * @api {get} /api/v1/get/bugsByUserId",
 * @apiGroup Tracker
 *
 * @apiParam {string} Authorization token
 @apiParam {string} userId

 *
   * @apiSuccessExample {json} Success-Response:{
   {
  {
    "error": false,
    "message": null,
    "status": 200,
    "data": [
        {
      
        {
            "_id": "5f40e19579639243580c3d5e",
            "username": "kalyan2",
            "title": "test title",
            "priority": "P1",
            "status": "open",
            "description": "this is sample description",
            "assignee": "kalyan",
            "watchedUser": "5f40c8ea3682d647fc55b0be",
            "watchedBug": "5f40debf79639243580c3d59",
            "createdDate": "2020-08-22T09:12:53.846Z",
            "__v": 0
        }
    ]
}
} 
 */

  app.get(
    apiConfig.config.apiVersion + "/get/usersBybugId",
    auth.authValidation,
    bugController.getWatchersByUsername
  );

/**
 * @api {get} /api/v1/get/usersBybugId",
 * @apiGroup Tracker
 *
 * @apiParam {string} Authorization token
 @apiParam {string} bugId

 *
   * @apiSuccessExample {json} Success-Response:{
   {
  {
    "error": false,
    "message": null,
    "status": 200,
    "data": [
        {
      
        {
            "_id": "5f40e19579639243580c3d5e",
            "username": "kalyan2",
            "title": "test title",
            "priority": "P1",
            "status": "open",
            "description": "this is sample description",
            "assignee": "kalyan",
            "watchedUser": "5f40c8ea3682d647fc55b0be",
            "watchedBug": "5f40debf79639243580c3d59",
            "createdDate": "2020-08-22T09:12:53.846Z",
            "__v": 0
        }
    ]
}
} 
 */




  app.post(
    apiConfig.config.apiVersion + "/uploadAttachment",
    bugController.uploadAttachment
  );


  app.post(
    apiConfig.config.apiVersion + "/upload/attachment",
    auth.authValidation,
    bugController.storeAttachments
  )
  

};
module.exports = { bugRoutes: bugRoutes };
