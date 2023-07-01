const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    unique: true,
    type: String
  },
  avatar: {
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String
  },
  about: {
    required: true,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30, 
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    minlength: 8,
    select: false, 
    type: String
  },
});

module.exports = mongoose.model('user', userSchema);