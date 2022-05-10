const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Product = new Schema({
    // xac dinh san pham nam trong danh muc nao
    catalog_id: {
        type: String,
        require: true,
        default: '',
    },
    // ten san pham
    name: {
        type: String,
        require: true,
        default: '',
    },
    //gia tien
    price: {
        type: Number,
        require: true,
        default: 0,
    },
    // so luong
    amount: {
        type: Number,
        require: true,
        default: 0,
    },
    // trang thai
    status: {
        type: String,
        require: true,
        default: '',
    },
    // chi tiet san pham
    product_detail: {
        type: String,
        require: true,
        default: '',
    },
    // mo ta san pham
    description: {
        type: String,
        require: true,
        default: '',
    },
    // gia sale
    price_seo: {
        type: String,
        require: true,
        default: '',
    },
    // anh
    image: {
        type: String,
        require: true,
        default: '',
    },
    // anh mo ta
    image_destination: {
        type: Array,
        default: [],
    },
    // luot xem
    view_user: {
        type: Number,
        default: 0,
    },
    // luot vote
    vote_user: {
        type: Number,
        default: 0,
    },
    // đã bán
    sold: {
        type: Number,
        default: 0,
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
});
module.exports = mongoose.model('Product', Product, 'product');
