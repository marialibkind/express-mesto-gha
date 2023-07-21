const User = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(http2.HTTP_STATUS_INTERNAL_ERROR).send({
      message: "Ошибка на сервере",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create({ name, about, avatar });
    res.status(http2.HTTP_STATUS_CREATED).send(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(http2.HTTP_STATUS_BAD_REQUEST).send({
        message: "Неверные данные",
      });
      return;
    }
    res.status(http2.HTTP_STATUS_INTERNAL_ERROR).send({
      message: "Ошибка на сервере",
    });
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(http2.HTTP_STATUS_NOT_FOUND).send({
        message: "Пользователь не найден",
      });
      return;
    }
    res.send(user);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(http2.HTTP_STATUS_BAD_REQUEST).send({
        message: "Неверные данные",
      });
      return;
    }
    res.status(http2.HTTP_STATUS_INTERNAL_ERROR).send({
      message: "Ошибка на сервере",
    });
  }
};

const setProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(http2.HTTP_STATUS_NOT_FOUND).send({
        message: "Пользователь не обновлён",
      });
    } else {
      res.send(user);
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(http2.HTTP_STATUS_BAD_REQUEST).send({
        message: "Неверные данные",
      });
      return;
    }
    res.status(http2.HTTP_STATUS_INTERNAL_ERROR).send({
      message: "Ошибка на сервере",
    });
  }
};

const setAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true });
    if (!user) {
      res.status(http2.HTTP_STATUS_NOT_FOUND).send({
        message: "Пользователь не обновлён",
      });
    } else {
      res.send(user);
    }
  } catch (error) {
    if (error.avatar === "ValidationError") {
      res.status(http2.HTTP_STATUS_BAD_REQUEST).send({
        message: "Неверные данные",
      });
      return;
    }
    res.status(http2.HTTP_STATUS_INTERNAL_ERROR).send({
      message: "Ошибка на сервере",
    });
  }
};

module.exports = {
  getUsers, createUser, getUserId, setProfile, setAvatar,
};
