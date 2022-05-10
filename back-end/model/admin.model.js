const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Boolean = mongoose.Schema.Types.Boolean;
// Define collection and schema for Business
let Admin = new Schema(
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
        address: {
            type: String,
            default: '',
        },
        gender: {
            type: String,
            default: '',
        },
        // info: {
        //     type: String,
        //     default: '{}',
        // },
        password: {
            type: String,
            required: true,
            default: '12345@2121',
        },
        date_of_birth: {
            type: String,
            default: '',
        },
        //chuc vu
        position: {
            type: String,
            default: '',
        },
        status: {
            type: Boolean,
            default: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        created: {
            type: Date,
            required: true,
            default: new Date().getTime(),
        },
    },
    {
        collection: 'admin',
    },
);

module.exports = mongoose.model('Admin', Admin);
