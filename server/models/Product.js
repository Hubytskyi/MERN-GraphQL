const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String
  },
  slug: {
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