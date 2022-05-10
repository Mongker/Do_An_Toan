const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionModel = new Schema(
    {
        // tai khoan
        user_id: {
            type: String,
            required: true,
            default: '',
        },
        // dia chi giao hang
        address: {
            type: String,
            required: true,
            default: '',
        },
        // khung gio nhan hang
        delivery_time: {
            type: String,
            required: true,
            default: '',
        },
        // hinh thuc thanh toan
        payment: {
            type: String,
            required: true,
            default: '',
        },
        // ghi chu don hang
        message: {
            type: String,
            default: '',
        },
        messageError: {
            type: String,
            default: '',
        },
        // số điện thoại đặt hàng
        phone: {
            type: String,
            required: true,
            default: '',
        },
        // san pham trong gio duoc chon
        carts_id: {
            type: Array,
            required: true,
            default: [],
        },
        // tong tien don hang
        amount: {
            type: Number,
            default: 0,
        },
        time_update: {
            type: Number,
            required: true,
        },
        // trang thai don hang
        status_transaction: {
            type: String,
            required: true,
            default: 'Chờ xác nhận',
        },
        // ngay tao don hang
        created: {
            type: Date,
            required: true,
            default: new Date().getTime(),
        },
    },
    {
        collection: 'transaction',
    },
);

module.exports = mongoose.model('Transaction', TransactionModel);
