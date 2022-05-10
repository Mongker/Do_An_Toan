const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Slider = new Schema(
    {
        name: {
            type: String,
            require: true,
            default: '',
        },
        image_link: {
            type: String,
            require: true,
            default: '',
        },
        index: {
            type: Number,
            require: true,
            default: 0,
        },
        destination: {
            type: String,
            default: '',
        },
    },
    {
        collection: 'slider',
    },
);
module.exports = mongoose.model('Slider', Slider, 'slider');
