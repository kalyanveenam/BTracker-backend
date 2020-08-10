let { config } = require("../config/appConfig");
let userCon = require("../Controllers/userController");
let isAuth = require("../Middlewares/authVerify");
const userRoutes = (app) => {
  app.post(
    config.apiVersion + "/user/login",

    userCon.loginUser
  );
  /**
 * @api {post} /user/login

 * @apiGroup login User
 *
 * @apiParam {String} Username User's unique ID.
 *@apiParam {password} password of User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccessExample {json} Success-Response:{
    "error": false,
    "message": null,
    "status": 200,
    "data": {
        "token": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE5OWVjYjY4MzRiNDUyN2MyODQ4MDgiLCJuYW1lIjoia2FseWFuIiwiZW1haWwiOiJrYWx5YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiJrYXJ1QDEyMzQiLCJwaG9uZU5vIjo0MzIzNDIzNDIzLCJfX3YiOjAsImlhdCI6MTU5NTUxNDY5NH0.pGlbb-uYYeM3cnwZlBKruBddlLicAm0ViIolQSJup9g"
        },
        "userDetails": {
            "_id": "5f199ecb6834b4527c284808",
            "name": "kalyan",
            "email": "kalyan@gmail.com"
        }
    }
}
 */
  app.post(config.apiVersion + "/user/signup", userCon.createUser);
  /**
 * @api {post} /user/signup

 * @apiGroup Signup User
 *
 * @apiParam {String} name User's name.
 *@apiParam {password} password of User.
  *@apiParam {String} email email of User.
  *@apiParam {number} PhoneNo Phonenumber of User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *  @apiSuccessExample {json} Success-Response:
 * {
    "error": false,
    "message": null,
    "status": 200,
    "data": {
        "_id": "5f199ecb6834b4527c284808",
        "name": "kalyan",
        "email": "kalyan@gmail.com",
        "password": "karu@1234",
        "phoneNo": 4323423423,
        "__v": 0
    }
}
 */
  app.post(config.apiVersion + "/user/logout", userCon.logout);
 /**
 * @api {post} /user/logout

 * @apiGroup logout User
 *
 * @apiParam {token} Authorization.
 *  @apiSuccessExample {json} Success-Response:

 */


};

module.exports = {
  userRoutes: userRoutes,
};
