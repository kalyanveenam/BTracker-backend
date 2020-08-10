let apiResponse = require("../Libs/responseLib");

let routeNotFound = (req, res, next) => {
  let response = apiResponse.generate(
    true,
    null,
    404,
    "The route you are looking for is not found"
  );
  res.status(404).send(response);
};
module.exports = { routeNotFound: routeNotFound };
