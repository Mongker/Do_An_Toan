const express = require('express');

//controller
const { GET, POST, DELETE, PUT } = require('../controller/comments.controller');

// const
const commentsRouter = express.Router();

commentsRouter.route('/api/comment').get(GET).post(POST);
commentsRouter.route('/api/comment/:id').delete(DELETE).put(PUT);
module.exports = commentsRouter;
