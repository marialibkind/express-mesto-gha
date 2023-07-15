const User = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: "Ошибка на сервере",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    if (!name || !about || !avatar) {
      res.status(400).send({
        message: "Неверные данные",
      });
      return;
    }
    const user = await User.create({ name, about, avatar });
    if (!user) {
      res.status(404).send({
        message: "Пользователь не создан",
      });
      return;
    }
    res.status(201).send(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send({
        message: "Неверные данные",
      });
      return;
    }
    res.status(500).send({
      message: "Ошибка на сервере",
    });
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).send({
        message: "Пользователь не найден",
      });
      return;
    }
    res.send(user);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).send({
        message: "Неверные данные",
      });
      return;
    }
    res.status(500).send({
      message: "Ошибка на сервере",
    });
  }
};

const setProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const id = req.user._id;

    User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true },
    );
    if (!name || !about) {
      res.status(404).send({
        message: "Пользователь не найден",
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send({
        message: "Неверные данные",
      });
      return;
    }
    res.status(500).send({
      message: "Ошибка на сервере",
    });
  }
};

const setAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const id = req.user._id;
    User.findByIdAndUpdate(id, { avatar }, { new: true });
  } catch (error) {
    if (error.avatar === "ValidationError") {
      res.status(400).send({
        message: "Неверные данные",
      });
      return;
    }
    res.status(500).send({
      message: "Ошибка на сервере",
    });
  }
};

module.exports = {
  getUsers, createUser, getUserId, setProfile, setAvatar,
};
