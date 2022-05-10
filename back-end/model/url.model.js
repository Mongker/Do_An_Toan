const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Url = new Schema(
  {
    url_compact: {
      type: String,
      require: true,
      default: '',
    },
    url: {
      type: String,
      require: true,
      default: '',
    },
  },
  {
    collection: 'url',
  },
);

module.exports = mongoose.model('Url', Url, 'url');
