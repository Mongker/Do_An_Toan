// model
const Slider = require('../model/slider.model');
async function _update(catalog, req, res) {
    await Slider.find({}, async function (err, data) {
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
        await Slider.find(function (err, data) {
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
        console.log(req.body);
        await Slider(req.body)
            .save()
            .then((slider) => {
                res.json({ message: 'SUCCESS', id: slider._id });
            })
            .catch((err) => {
                res.status(500).json({ message: 'error' });
            });
    },
    DELETE: async function (req, res) {
        await Slider.findByIdAndRemove({ _id: req.params.id }, async function (err, Product) {
            if (err) res.json(err);
            else {
                try {
                    if (Product) {
                        await _update(Product, req, res);
                    }
                } catch (err) {
                    console.log('DELETE slider', err);
                }
            }
        });
    },
    UPDATE: async function (req, res) {
        await Slider.findById(req.params.id, function (err, Slider) {
            if (!Slider) res.status(404).send('data is not found');
            else {
                Slider.name = req.body.name;
                Slider.image_link = req.body.image_link;
                Slider.index = req.body.index;
                Slider.destination = req.body.destination;
                Slider.save()
                    .then((business) => {
                        return res.json({ message: 'SUCCESS' });
                    })
                    .catch((err) => {
                        return res.status(400).send({ message: 'Failed to update Product' });
                    });
            }
        });
    },
};
