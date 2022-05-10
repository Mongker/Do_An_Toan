const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImgEntry = new Schema(
    {
        base64: {
            type: String,
            require: true,
            default: '',
        },
        name: {
            type: String,
            require: true,
            default: '',
        },
        created: {
            type: Date,
            required: true,
            default: new Date().getTime(),
        },
    },
    {
        collection: 'img_entry',
    },
);

module.exports = mongoose.model('img_entry', ImgEntry, 'img_entry');
