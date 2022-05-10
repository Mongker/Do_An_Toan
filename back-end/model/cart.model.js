const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Business
const Boolean = mongoose.Schema.Types.Boolean;

let Cart = new Schema(
    {
        product_id: {
            type: String,
            required: true,
            default: '',
        },
        // Note: Nếu false: là đang trong giỏ hàng, true: sản phẩm đã có giao dịch
        status: {
            type: Boolean,
            required: true,
            default: false,
        },
        user_id: {
            type: String,
            required: true,
            default: '',
        },
        amount: {
            type: Number,
            required: true,
            default: 1,
        },
        created: {
            type: Date,
            required: true,
            default: new Date().getTime(),
        },
    },
    {
        collection: 'cart',
    },
);

module.exports = mongoose.model('Cart', Cart);
