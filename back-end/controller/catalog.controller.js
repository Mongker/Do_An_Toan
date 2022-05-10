// model
const Catalog = require('../model/catalog.model');

async function _update(catalog, req, res) {
    await Catalog.find({ paramId: catalog.paramId }, async function (err, data) {
        if (err) return res.status(404).json({ message: err });
        await data.map(async (item, index) => {
            catalog.index < item.index && (item.index = index + 1);
            await item
                .save()
                .then()
                .catch((err) => {
                    console.log('err:', err);
                });
        });
        return res.json({ message: 'SUCCESS' });
    });
}
module.exports = {
    GET: async function (req, res) {
        await Catalog.find(function (err, data) {
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
        // req.body.created = now;
        await Catalog.find({ name: req.body.name }, function (err, data) {
            if (err) return res.status(404).json({ message: err });
            else if (data.length >= 1) {
                return res.json({ message: 'Danh mục đã tồn tại!' });
            } else if (data.length === 0) {
                return Catalog(req.body)
                    .save()
                    .then((catalog) => {
                        return res.status(200).json({ message: 'Thêm danh mục thành công!', data: catalog });
                    })
                    .catch((err) => {
                        return res.status(404).json({ message: err });
                    });
            }
        });
    },
    DELETE: async function (req, res) {
        await Catalog.findByIdAndRemove({ _id: req.params.id }, async function (err, catalog) {
            if (err) res.json(err);
            else {
                try {
                    if (catalog) {
                        await _update(catalog, req, res);
                    }
                    return res.json({ message: 'SUCCESS' });
                } catch (err) {
                    console.log('DELETE CATEGORY ERROR:', err);
                }
            }
        });
    },
    UPDATE: async function (req, res) {
        let catalogID = req.params.id;
        await Catalog.findById(catalogID, function (err, response) {
            if (!response) res.status(404).json({ message: 'Không tìm thấy dữ liệu!' });
            else {
                if (req.body.name === response.name) {
                    response.name = req.body.name;
                    response.icon = req.body.icon;
                    response.description = req.body.description;
                    response.paramId = req.body.paramId;
                    response.index = req.body.index;
                    response.status = req.body.status;

                    return response
                        .save()
                        .then((business) => {
                            return res.status(200).json({ message: 'Sửa thông tin sản phẩm thành công !' });
                        })
                        .catch((err) => {
                            return res.status(400).send({ message: 'Không cập nhật được sản phẩm' });
                        });
                } else if (req.body.name !== response.name) {
                    Catalog.find({ name: req.body.name }, function (err, data) {
                        if (err) return res.status(404).json({ message: err });
                        else if (data.length >= 1) {
                            return res.json({ message: 'Trùng tên với 1 Sản phẩm khác đã tồn tại. Xin mời nhập tên khác để cập nhật!' });
                        } else if (data.length === 0) {
                            response.name = req.body.name;
                            response.icon = req.body.icon;
                            response.description = req.body.description;
                            response.paramId = req.body.paramId;
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
};
