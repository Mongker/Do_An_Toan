const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Catalog = new Schema(
    {
        // ten danh muc
        name: {
            type: String,
            required: true,
            default: '',
        },
        // icon
        icon: {
            type: String,
            required: true,
            default: '',
        },
        // mo ta
        description: {
            type: String,
            default: '',
        },
        // cap do menu gia tri -1 la thang cha id cua 1 danh muc thi la con cua danh muc co id do
        paramId: {
            type: String,
            default: '-1',
        },
        index: {
            type: Number,
            sequence_value: 0,
        },
        update_day: {
            type: Date,
            default: new Date().getTime(),
        },
        status: {
            type: Boolean,
            default: true,
        },
        created_day: {
            type: Date,
            default: new Date().getTime(),
        },
    },
    {
        collection: 'catalog',
    },
);

module.exports = mongoose.model('Catalog', Catalog);
