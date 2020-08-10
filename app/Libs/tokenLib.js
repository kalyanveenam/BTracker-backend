let jwt = require("jsonwebtoken");
let secret = "smkccss";
let generateToken = (data, callback) => {
  try {
    console.log(data);
    var tokenDetails = {
      token: jwt.sign(data.toJSON(), secret),
      secret: secret,
    };
    callback(null, tokenDetails);
  } catch (err) {
    callback(err, null);
  }
};
module.exports = {
  generateToken: generateToken,
};
