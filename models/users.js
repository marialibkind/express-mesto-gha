const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    default: "Жак-Ив Кусто",
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  avatar: {
    required: true,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    type: String,
  },
  about: {
    required: true,
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
    type: String,
  }
});

module.exports = mongoose.model("user", userSchema);
