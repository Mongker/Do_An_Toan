// model
const Cart = require('../model/cart.model');

module.exports = {
    GET: async function (req, res) {
        if (req.query && Object.keys(req.query).length > 0) {
            await Cart.find(req.query, function (err, data) {
                if (err) return res.status(404).json({ message: err });
                else {
                    const objectData = {};
                    data.map((item) => {
                        objectData[item._id] = item;
                    });
                    return res.status(200).json(objectData);
                }
            });
        } else {
            await Cart.find(function (err, data) {
                if (err) return res.status(404).json({ message: err });
                else {
                    const objectData = {};
                    data.map((item) => {
                        objectData[item._id] = item;
                    });
                    return res.status(200).json(objectData);
                }
            });
        }
    },
    GET_ID: async function (req, res) {
        await Cart.find({ user_id: req.params.id }, function (err, data) {
            if (err) return res.status(404).json({ message: err });
            else {
                const objectData = {};
                data.map((item) => {
                    objectData[item._id] = item;
                });
                return res.status(200).json(objectData);
            }
        });
    },
    POST: async function (req, res) {
        await Cart.find({ product_id: req.body.product_id, status: false, user_id: req.body.user_id }, function (err, data) {
            if (err) return res.status(404).json({ message: err });
            else if (data.length === 0) {
                Cart(req.body)
                    .save()
                    .then((Cart) => {
                        res.json({ message: 'SUCCESS', cart: Cart });
                    })
                    .catch((err) => {
                        res.status(200).json({ message: err });
                    });
            } else return res.json({ message: 'Đã tồn tại trong giỏ hàng', cart: data[0] });
        });
    },
    DELETE: async function (req, res) {
        await Cart.findByIdAndRemove({ _id: req.params.id }, function (err, Product) {
            if (err) res.json(err);
            else res.json({ message: 'SUCCESS' });
        });
    },
    UPDATE: async function (req, res) {
        await Cart.findById({ _id: req.params.id }, function (err, cart) {
            if (!cart) res.status(404).send('data is not found');
            else {
                // console.log(req);
                req.body.amount && (cart.amount = req.body.amount);
                // console.log(req.body.status);
                req.body.status && (cart.status = req.body.status);
                cart.save()
                    .then((business) => {
                        res.json({ message: 'SUCCESS', data: business });
                    })
                    .catch((err) => {
                        res.status(400).send({ message: 'Failed to update Product' });
                    });
            }
        });
    },
};
