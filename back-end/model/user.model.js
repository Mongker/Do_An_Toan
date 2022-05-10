const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Boolean = mongoose.Schema.Types.Boolean;
// const Number = mongoose.Schema.Types.N;
// Define collection and schema for Business
let User = new Schema(
    {
        name: {
            type: String,
            required: true,
            default: '',
        },
        email: {
            type: String,
            required: true,
            default: '',
        },
        phone: {
            type: String,
            required: true,
            default: '',
        },
        gender: {
            type: Number,
            default: 0,
        },
        date_of_birth: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        password: {
            type: String,
            required: true,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
        status: {
            type: Boolean,
            default: true,
        },
        update_created: {
            type: Date,
            required: true,
            default: new Date().getTime(),
        },
        created: {
            type: Date,
            required: true,
            default: new Date().getTime(),
        },
    },
    {
        collection: 'user',
    },
);

module.exports = mongoose.model('User', User);
