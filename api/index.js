const publicApi = require('./public');
const userApi = require('./user');
// const eventApi = require('./event');
const authApi = require('./auth');

const api = (server) => {
  server.use('/api/v1/auth', authApi);
  server.use('/', publicApi);
  server.use('/api/v1/user', userApi);
  // server.use('/api/v1/event', eventApi)
  // server.use('/', routes)
};

module.exports = api;