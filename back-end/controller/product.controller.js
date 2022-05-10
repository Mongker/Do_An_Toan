// model
const Product = require('../model/product.model');
const excel = require('exceljs');
module.exports = {
    GET: async function (req, res) {
        if (req.query && Object.keys(req.query).length > 0) {
            await Product.find(req.query, function (err, data) {
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
            await Product.find(function (err, data) {
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
    GET_PRODUCT_IN_THE_CATEGORY: async function (req, res) {
        await Product.find({ catalog_id: req.params.id }, function (err, product) {
            if (err) return res.status(404).json({ message: err });
            else {
                const objectData = {};
                product.map((item) => {
                    objectData[item._id] = item;
                });
                return res.status(200).json(objectData);
            }
        });
    },
    POST: async function (req, res) {
        await Product.find({ name: req.body.name }, function (err, data) {
            if (err) return res.status(404).json({ message: err });
            else if (data.length >= 1) {
                return res.json({ message: 'Sản phẩm đã tồn tại!' });
            } else if (data.length === 0) {
                return Product(req.body)
                    .save()
                    .then((product) => {
                        return res.status(200).json({ message: 'Thêm sản phẩm thành công!', id: product._id });
                    })
                    .catch((err) => {
                        return res.status(404).json({ message: err });
                    });
            }
        });
    },
    DELETE: async function (req, res) {
        await Product.findByIdAndRemove({ _id: req.params.id }, function (err, Product) {
            if (err) return res.json(err);
            else return res.json({ message: 'SUCCESS' });
        });
    },
    UPDATE: async function (req, res) {
        let productId = req.params.id;
        await Product.findById(productId, function (err, response) {
            if (!response) res.status(404).json({ message: 'Không tìm thấy dữ liệu!' });
            else {
                if (req.body.name === response.name) {
                    response.catalog_id = req.body.catalog_id;
                    response.name = req.body.name;
                    response.price = req.body.price;
                    response.amount = req.body.amount;
                    response.status = req.body.status;
                    response.product_detail = req.body.product_detail;
                    response.description = req.body.description;
                    response.comment = req.body.comment;
                    response.price_seo = req.body.price_seo;
                    response.image = req.body.image;
                    response.image_destination = req.body.image_destination;
                    response.view_user = req.body.view_user;
                    response.vote_user = req.body.vote_user;
                    response.sold = req.body.sold;
                    return response
                        .save()
                        .then((business) => {
                            return res.status(200).json({ message: 'Sửa thông tin sản phẩm thành công !' });
                        })
                        .catch((err) => {
                            return res.status(400).send({ message: 'Không cập nhật được sản phẩm' });
                        });
                } else if (req.body.name !== response.name) {
                    Product.find({ name: req.body.name }, function (err, data) {
                        if (err) return res.status(404).json({ message: err });
                        else if (data.length >= 1) {
                            return res.json({ message: 'Trùng tên với 1 Sản phẩm khác đã tồn tại. Xin mời nhập tên khác để cập nhật!' });
                        } else if (data.length === 0) {
                            response.catalog_id = req.body.catalog_id;
                            response.name = req.body.name;
                            response.price = req.body.price;
                            response.amount = req.body.amount;
                            response.status = req.body.status;
                            response.product_detail = req.body.product_detail;
                            response.description = req.body.description;
                            response.comment = req.body.comment;
                            response.price_seo = req.body.price_seo;
                            response.image = req.body.image;
                            response.image_destination = req.body.image_destination;
                            response.view_user = req.body.view_user;
                            response.vote_user = req.body.vote_user;
                            response.sold = req.body.sold;
                            return response
                                .save()
                                .then((business) => {
                                    return res.status(200).json({ message: 'Sửa thông tin sản phẩm thành công !' });
                                })
                                .catch((err) => {
                                    return res.status(400).send({ message: 'Không cập nhật được sản phẩm' });
                                });
                        }
                    });
                }
            }
        });
    },
    // EXPORT: async function (req, res) {
    //     await Product.find(function (err, data) {
    //         if (err) return res.status(404).json({ message: err });
    //         else {
    //             let tutorials = [];
    //             data.forEach((obj) => {
    //                 tutorials.push({
    //                     catalog_id: obj.catalog_id,
    //                     name: obj.name,
    //                     price: obj.price,
    //                     amount: obj.amount,
    //                     status: obj.status,
    //                     description: obj.description,
    //                     price_seo: obj.price_seo,
    //                     sold: obj.sold,
    //                     vote_user: obj.vote_user,
    //                     update_created: obj.update_created,
    //                     created: obj.created,
    //                 });
    //             });
    //             let workbook = new excel.Workbook();
    //             let worksheet = workbook.addWorksheet('Products');
    //             worksheet.columns = [
    //                 { header: 'Catalog', key: 'catalog_id', width: 5 },
    //                 { header: 'Name', key: 'name', width: 25 },
    //                 { header: 'Price', key: 'price', width: 25 },
    //                 { header: 'Published', key: 'published', width: 10 },
    //             ];
    //             // Add Array Rows
    //             worksheet.addRows(tutorials);
    //
    //             res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    //             res.setHeader('Content-Disposition', 'attachment; filename=' + 'Products.xlsx');
    //
    //             return workbook.xlsx.write(res).then(function () {
    //                 res.status(200).end();
    //             });
    //         }
    //     });
    // },
};
