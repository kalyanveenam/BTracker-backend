let config = {
  apiVersion: "/api/v1",
  PORT: process.env.PORT || 3001,

  mongodb: {
    url: "mongodb+srv://BTAdmin:admin@2020@btracker.mwrg9.mongodb.net/test",
  },
  env: "prod",
};

module.exports = { config: config };
