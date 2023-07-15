const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    default: "Жак-Ив Кусто",
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  avatar: {
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    type: String,
  },
  about: {
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
