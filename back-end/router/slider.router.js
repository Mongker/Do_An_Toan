const express = require('express');

//controller
const {GET, POST, DELETE, UPDATE} = require('../controller/slider.controller');

// const
const sliderRouter = express.Router();

sliderRouter.route('/api/slider').get(GET).post(POST);
sliderRouter.route('/api/slider/:id').delete(DELETE).put(UPDATE);
module.exports = sliderRouter;
