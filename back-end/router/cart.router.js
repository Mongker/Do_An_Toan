const express = require('express');

//controller
const { GET, GET_ID, POST, DELETE, UPDATE } = require('../controller/cart.controller');

// const
const cartRouter = express.Router();

cartRouter.route('/api/cart').get(GET).post(POST).get(GET_ID);
cartRouter.route('/api/cart-user/:id').get(GET_ID);
cartRouter.route('/api/cart/:id').delete(DELETE).put(UPDATE);
module.exports = cartRouter;
