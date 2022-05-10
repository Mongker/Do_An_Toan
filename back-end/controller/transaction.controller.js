// model
const Transaction = require('../model/transaction.model');
const Cart = require('../model/cart.model');
const Admin = require('../model/admin.model');

const CheckUseOfAdmin = async (req, res, transaction) => {
    const objectData = {};
    await Admin.find(function (err, admin) {
        if (err) return res.status(404).json({ message: err });
        else {
            admin.length > 0 &&
                admin.map((item) => {
                    objectData[item._id] = {
                        _id: item.id,
                        name: item.name,
                        email: item.email,
                        position: item.position,
                        avatar: item.avatar,
                        phone: item.phone,
                        info: item.info,
                        status: item.status,
                    };
                });
            return objectData;
        }
    });
    if (Object.keys(objectData).includes(req.body.user_id)) {
        req.body.status && (transaction.status = req.body.status);
        transaction
            .save()
            .then((business) => {
                return res.status(200).json({ message: 'SUCCESS', data: business });
            })
            .catch((err) => {
                return res.status(200).send({ message: 'Failed to update catalog' });
            });
    } else {
        if ((req.body && req.body.status_transaction === 'Chờ xác nhận') || req.body.status_transaction === 'Đã hủy') {
            // Note: cho người dùng
            req.body.message && (transaction.message = req.body.message);
            req.body.address && (transaction.address = req.body.address);
            req.body.delivery_time && (transaction.delivery_time = req.body.delivery_time);
            req.body.carts_id && (transaction.carts_id = req.body.carts_id);
            transaction
                .save()
                .then((business) => {
                    return res.status(200).json({ message: 'SUCCESS', data: business });
                })
                .catch((err) => {
                    return res.status(200).send({ message: 'Lỗi kết nối' });
                });
        } else {
            return res.status(200).send({ message: 'Bạn không có quyền' });
        }
    }
};
module.exports = {
    GET: async function (req, res) {
        if (req.query && Object.keys(req.query).length > 0) {
            await Transaction.find(req.query, function (err, data) {
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
            await Transaction.find(function (err, data) {
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
    POST: async function (req, res) {
        req.body.carts_id &&
            req.body.carts_id.map(async (cartId) => {
                await Cart.findById({ _id: cartId }, function (err, cart) {
                    cart.status = true;
                    cart.save();
                });
            });
        req.body.time_update = new Date().getTime();
        Transaction(req.body)
            .save()
            .then((transaction) => {
                res.json({ message: 'SUCCESS', data: transaction });
            })
            .catch((err) => {
                res.status(200).json({ message: err });
            });
    },
    GET_ID: async function (req, res) {
        await Transaction.findById({ _id: req.params.id }, function (err, transaction) {
            if (err) return res.status(404).json({ message: err });
            else return res.status(200).json(User);
        });
    },

    // DOANH THU
    GET_CHART: async function (req, res) {
        await Transaction.find(function (err, transaction) {
            if (err) return res.status(404).json({ message: err });
            else {
                const date = new Date();
                const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
                const dateMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
                let revenueMoneyDay = 0;
                let revenueMoneyMonth = 0;
                let numberTransactionDay = 0;
                let numberTransactionMonth = 0;
                let listRevenueMonth = [];
                let listDateMonth = [];
                let listDatePrecious = [];
                let listRevenuePrecious = [];
                for (let i = 1; i <= 12; i++) {
                    const dateMonthOfYear = new Date(date.getFullYear(), i, 1).getTime();
                    listRevenueMonth.push({ x: `T ${i}`, y: 0 });
                    listDateMonth.push(dateMonthOfYear);
                }
                for (let i = 1; i <= 4; i++) {
                    let period;
                    switch (i) {
                        case 1:
                            period = 1;
                            break;
                        case 2:
                            period = 4;
                            break;
                        case 3:
                            period = 7;
                            break;
                        default:
                            period = 10;
                        // code block
                    }
                    const datePreciousOfYear = new Date(date.getFullYear(), period, 1).getTime();
                    listDatePrecious.push(datePreciousOfYear);
                    listRevenuePrecious.push({ x: `Quý ${i}`, y: 0 });
                }
                transaction.map((item) => {
                    item.time_update > dateDay && item.status_transaction === 'Đã giao' && (revenueMoneyDay = revenueMoneyDay + item.amount);
                    item.time_update > dateMonth && item.status_transaction === 'Đã giao' && (revenueMoneyMonth = revenueMoneyMonth + item.amount);
                    const createTimeStamp = new Date(item.created).getTime();
                    createTimeStamp > dateDay && (numberTransactionDay = numberTransactionDay + 1);
                    createTimeStamp > dateMonth && (numberTransactionMonth = numberTransactionMonth + 1);
                    for (let i = 0; i < 12; i++) {
                        createTimeStamp > listDateMonth[i] && createTimeStamp < listDateMonth[i + 1] && (listRevenueMonth[i + 1].y = listRevenueMonth[i + 1].y + 1);
                    }
                    for (let i = 0; i < 4; i++) {
                        createTimeStamp > listDatePrecious[i] && createTimeStamp < listDatePrecious[i + 1] && (listRevenuePrecious[i].y = listRevenuePrecious[i].y + 1);
                    }
                    return item;
                });
                return res.status(200).json({
                    revenueMoneyDay: revenueMoneyDay.toFixed(2), // Tổng doanh thu trong 1 ngày
                    revenueMoneyMonth: revenueMoneyMonth.toFixed(2), // Tổng doanh thu trong 1 tháng
                    numberTransactionDay, // số đơn hàng đã đặt trong ngày
                    numberTransactionMonth, // Số đơn hàng đã đặt trong tháng
                    listRevenueMonth,
                    listRevenuePrecious,
                });
            }
        });
    },
    UPDATE: async function (req, res) {
        await Transaction.findById(req.params.id, function (err, transaction) {
            if (!transaction) res.status(404).send('data is not found');
            else {
                transaction.status_transaction = req.body.status_transaction;
                transaction.time_update = new Date().getTime();
                req.body['messageError'] && (transaction.messageError = req.body.messageError);
                transaction
                    .save()
                    .then((business) => {
                        res.status(200).json({ message: 'SUCCESS', data: business });
                    })
                    .catch((err) => {
                        res.status(200).send({ message: 'Lỗi kết nối' });
                    });
                // return CheckUseOfAdmin(req, res, transaction);
            }
        });
    },
};
