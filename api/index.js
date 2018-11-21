const publicApi = require('./public');
const userApi = require('./user');
const eventApi = require('./event');

const api = (server) => {
    server.use('/api/v1/public', publicApi);
    server.use('/api/v1/user', userApi);
    // server.use('/api/v1/event', eventApi)
};

module.exports = api;