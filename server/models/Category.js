const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String
  },
  slug: {
    type: String
  },
  products: {
    type: Array,
    ref: 'Product'
  }
});

module.exports = mongoose.model('Category', CategorySchema);