const express = require('express');
const { PUT } = require('../controller/user.controller');
const UserRouter = express.Router();

// container
const { GET, POST, DELETE, UPDATE, GET_ID, LOGIN } = require('../controller/user.controller');

UserRouter.route('/api/user').get(GET).post(POST);
UserRouter.route('/api/user/login').post(LOGIN);
UserRouter.route('/api/user/:id').get(GET_ID).delete(DELETE).put(UPDATE);
UserRouter.route('/api/user/admin/:id').put(PUT);

module.exports = UserRouter;
