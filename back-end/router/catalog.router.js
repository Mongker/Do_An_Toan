const express = require('express');
const catalogRouter = express.Router();


// container
const {GET, POST, DELETE, UPDATE} = require('../controller/catalog.controller')

catalogRouter.route('/api/catalog').get(GET).post(POST);
catalogRouter.route('/api/catalog/:id').delete(DELETE).put(UPDATE);

module.exports = catalogRouter;
