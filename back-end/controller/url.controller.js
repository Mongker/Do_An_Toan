const Url = require('../model/url.model');

module.exports = {
    ADD: async function (req, res) {
        const data = {
            url_compact: req.body.url_compact,
            url: req.body.url,
        };
        await Url(data)
            .save()
            .then((url) => {
                return res.json({ message: 'SUCCESS' });
            })
            .catch((err) => {
                return res.status(500).json({ message: 'error' });
            });
    },
    GET_URL: async function (req, res) {
        await Url.find(function (err, data) {
            if (err) return res.status(404).json({ message: err });
            else {
                return res.status(200).json(data[0]);
            }
        }).where({ url_compact: req.params.id });
    },
};
