let generate = (error, message, status, data) => {
  let response = {
    error: error,
    message: message,
    status: status,

    data: data,
  };
  return response;
};
module.exports = { generate: generate };
