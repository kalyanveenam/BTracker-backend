let response = require("../Libs/responseLib");
const Mongoose = require("mongoose");
let checkLib = require("../Libs/checkLib");
let passwordLib = require("../Libs/PasswordLib");
let userModel = Mongoose.model("users");
let authModel = Mongoose.model("auth");
let token = require("../Libs/tokenLib");

let loginUser = (req, res) => {
  let verifyData = (req, res) => {
    return new Promise((resolve, reject) => {
      if (req.body.email) {
        userModel.findOne({ email: req.body.email }).exec((err, result) => {
          if (result) {
            resolve(result);
          } else if (checkLib.isEmpty(result)) {
            let apiResponse = response.generate(
              false,
              null,
              404,
              "User not found! please sign up! "
            );

            reject(apiResponse);
          }
        });
      } else {
        let apiResponse = response.generate(
          false,
          null,
          404,
          "Mandatory fields missing, Please provide your userId and password"
        );

        reject(apiResponse);
      }
    });
  };
  let validatePassword = (userDetails) => {
    return new Promise((resolve, reject) => {
      if (req.body.password) {
        passwordLib.verifyPassword(
          req.body.password,
          userDetails.password,
          (res, err) => {
            if (res) {
              resolve(userDetails);
            } else {
              let apiResponse = response.generate(
                true,
                null,
                404,
                "Invalid password! please try again"
              );
              reject(apiResponse);
            }
          }
        );
      } else {
        let apiResponse = response.generate(
          false,
          null,
          404,
          "Email or password is missing"
        );
        reject(apiResponse);
      }
    });
  };
  let tokengenerate = (data) => {
    return new Promise((resolve, reject) => {
      token.generateToken(data, (err, res) => {
        console.log("zz");

        let userObj = data.toObject();
        console.log(userObj.password);
        delete userObj.password;
        delete userObj.phoneNo;
        delete userObj.__v;
        if (res) {
          let tokenResponse = { token: res, userDetails: userObj };

          resolve(tokenResponse);
        } else {
          reject(err);
        }
      });
    });
  };
  let saveToken = (tokendetails) => {
    return new Promise((resolve, reject) => {
      console.log("inside save token gen");
      console.log(tokendetails.userDetails._id);
      authModel.findOne(
        { userId: tokendetails.userDetails._id },
        (err, result) => {
          if (err) {
            let apiResponse = response.generate(false, null, 404, err);
            reject(apiResponse);
          } else if (checkLib.isEmpty(result)) {
            const createAuth = new authModel({
              userId: tokendetails.userDetails._id,
              authToken: tokendetails.token.token,
              tokenSecret: tokendetails.token.secret,
              generatedDate: Date.now(),
            }).save((err, result) => {
              if (err) {
                let apiResponse = response.generate(false, null, 404, err);
                reject(apiResponse);
              } else {
                console.log("here token");
                console.log(tokendetails.userDetails.password);
                delete tokendetails.token.secret;
                delete tokendetails.userDetails.password;

                let apiResponse = response.generate(
                  false,
                  null,
                  200,
                  tokendetails
                );
                resolve(apiResponse);
              }
            });

            console.log("coming here");
          } else {
            tokendetails.token.token = result.authToken;
            console.log("same token present");
            console.log(result);
            console.log("same tokendetails present");
            console.log(tokendetails.token.token);
            delete tokendetails.token.secret;
            let apiResponse = response.generate(false, null, 200, tokendetails);

            resolve(apiResponse);
          }
        }
      );
      //  resolve(tokendetails);
      // authModel.findOne({})
    });
  };
  verifyData(req, res)
    .then(validatePassword)
    .then(tokengenerate)
    .then(saveToken)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(404).send({ error: err });
    });
};
let createUser = (req, res) => {
  const createUser = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: passwordLib.hashPassword(req.body.password),
    phoneNo: req.body.phoneNo,
  }).save((err, result) => {
    if (err) {
      let apiResponse = response.generate(true, err, 404, null);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(false, null, 200, result);
      res.send(apiResponse);
    }
  });
};
let logout = (req, res) => {
  let deleteToken = (req, res) => {
    return new Promise((resolve, reject) => {
      if (req.headers.authorization) {
        authModel.findOneAndDelete(
          { authToken: req.headers.authorization },
          (error, result) => {
            if (result) {
              let apiResponse = response.generate(
                true,
                null,
                500,
                "Authorization token deleted successfully"
              );
              resolve(apiResponse);
            } else {
              let apiResponse = response.generate(
                true,
                null,
                500,
                "Unable to delete token"
              );
              reject(apiResponse);
            }
          }
        );
      } else {
        let apiResponse = response.generate(
          true,
          null,
          500,
          "Please provide Authorization token"
        );
        reject(apiResponse);
      }
    });
  };
  deleteToken(req, res)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};
module.exports = {
  loginUser: loginUser,
  createUser: createUser,
  logout: logout,
};
