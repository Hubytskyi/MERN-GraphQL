const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'editor', 'admin'],
  },
  password: {
    type: String
  },
});