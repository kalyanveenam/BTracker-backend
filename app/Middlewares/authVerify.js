let authModel = require("../models/auth");
let apiResponse = require("../Libs/responseLib");
let jwt = require("jsonwebtoken");
let authValidation = (req, res, next) => {
  if (req.headers.authorization) {
    authModel.findOne(
      { authToken: req.headers.authorization },
      (err, result) => {
        if (result) {
          jwt.verify(
            result.authToken,
            result.tokenSecret,
            (err, verifiedToken) => {
              if (verifiedToken) {
                req.user = verifiedToken;
              
                next();
              } else {
                let response = apiResponse.generate(
                  true,
                  err,
                  404,
                  "Token is not Verified, please try again"
                );
                res.status(404).send(response);
              }
            }
          );
        } else {
          let response = apiResponse.generate(
            true,
            err,
            404,
            "Invalid Authorization token! Please provide valid token"
          );
          res.status(404).send(response);
        }
      }
    );
  } else {
    let response = apiResponse.generate(
      true,
      null,
      404,
      "Please provide Authorization token"
    );
    res.status(403).send(response);
  }
};
module.exports = { authValidation: authValidation };
