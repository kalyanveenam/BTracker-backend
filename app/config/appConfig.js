let config = {
  apiVersion: "/api/v1",
  PORT: process.env.PORT || 3001,
  mongodb: {
    url: "mongodb://localhost:27017/BTracker",
  },
};

module.exports = { config: config };
