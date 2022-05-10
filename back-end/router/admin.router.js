const express = require('express');
const AdminRouter = express.Router();

// container
const {GET, POST, DELETE, UPDATE, GET_ID, LOGIN} = require('../controller/admin.controller');

AdminRouter.route('/api/admin').get(GET).post(POST);
AdminRouter.route('/api/admin/login').post(LOGIN);
AdminRouter.route('/api/admin/:id').get(GET_ID).delete(DELETE).put(UPDATE);

module.exports = AdminRouter;
