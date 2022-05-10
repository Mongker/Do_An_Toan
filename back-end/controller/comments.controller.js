// model
const Comments = require('../model/comment.model');
const Slider = require('../model/slider.model');

module.exports = {
    GET: async function (req, res) {
        await Comments.find({ id_product: req.query.id_product }, function (err, data) {
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
        try {
            await Comments(req.body)
                .save()
                .then((data) => {
                    res.json({ message: 'SUCCESS', data: data });
                })
                .catch((err) => {
                    res.status(500).json({ message: 'error' });
                });
        } catch (e) {
            console.log('POST error:', e);
        }
    },
    DELETE: async function (req, res) {
        try {
            await Comments.findByIdAndRemove({ _id: req.params.id }, async function (err, Product) {
                if (err) res.json(err);
                else res.json({ message: 'SUCCESS' });
            });
        } catch (e) {
            console.log('POST error:', e);
        }
    },
    PUT: async function (req, res) {
        await Comments.findById(req.params.id, function (err, comment) {
            if (!comment) res.status(404).send('data is not found');
            else {
                const findLike = comment.like_comment.indexOf(req.body.like_comment);
                if (!req.body.like_comment) {
                    return res.status(400).send({ message: 'Failed to update Product' });
                } else {
                    findLike === -1 ? comment.like_comment.push(req.body.like_comment) : comment.like_comment.splice(findLike, 1);
                    comment
                        .save()
                        .then((data) => {
                            return res.json({ message: 'SUCCESS', data });
                        })
                        .catch((err) => {
                            return res.status(400).send({ message: 'Failed to update Product' });
                        });
                }
            }
        });
    },
};
