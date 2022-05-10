const express = require('express');

//controller
const { GET_PRODUCT_IN_THE_CATEGORY, GET, POST, DELETE, UPDATE } = require('../controller/product.controller');

// const
const productRouter = express.Router();

productRouter.route('/api/product').get(GET).post(POST);
productRouter.route('/api/product/:id').delete(DELETE).put(UPDATE).get(GET_PRODUCT_IN_THE_CATEGORY);
module.exports = productRouter;
