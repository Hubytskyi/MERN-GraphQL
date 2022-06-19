const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String
  },
  slug: {
    type: String
  },
  sku: {
    type: String
  },
  price: {
    type: String
  },
  description: {
    type: String
  },
  categories: {
    type: Array,
    ref: 'Category'
  },
});

module.exports = mongoose.model('Product', ProductSchema);