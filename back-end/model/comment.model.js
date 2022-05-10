const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Comment = new Schema(
    {
        id_product: {
            type: String,
            require: true,
            default: '',
        },
        id_comment: {
            type: String,
            require: true,
            default: '-1', // Mặc định sẽ là '-1'
        },
        destination: {
            type: String,
            required: true,
            default: '',
        },
        id_user: {
            type: String,
            required: true,
        },
        vote: {
            type: Number,
            default: 0,
        },
        like_comment: {
            type: Array,
            default: [],
        },
        date: {
            type: Number,
            required: true,
        },
        created: {
            type: Number,
            required: true,
            default: new Date().getTime(),
        },
    },
    {
        collection: 'comments',
    },
);
module.exports = mongoose.model('comments', Comment, 'comments');
