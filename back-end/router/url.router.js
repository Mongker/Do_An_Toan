const express = require('express');

//controller
const { ADD, GET_URL } = require('../controller/url.controller');

// const
const productRouter = express.Router();

productRouter.route('/api/url').post(ADD);
productRouter.route('/api/url/:id').get(GET_URL);
module.exports = productRouter;
