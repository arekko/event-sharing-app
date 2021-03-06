const publicApi = require("./public");
const userApi = require("./user");
const commentApi = require("./comment");
const authApi = require("./auth");
const eventApi = require('./event')

const api = server => {
  server.use("/api/v1/auth", authApi);
  server.use("/", publicApi);
  server.use("/api/v1/comments", commentApi);
  server.use("/api/v1/user", userApi);
  server.use('/api/v1/event', eventApi)
  // server.use('/', routes)
};

module.exports = api;
