const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const CustomError = require("../errors/customError");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new CustomError(401, "неправильная почта или пароль");
    }
    const token = jwt.sign({ _id: user._id }, "******", { expiresIn: "7d" });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send({ message: "Успешно" });
  } catch (error) {
    next(error);
  }
};

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
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashpass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashpass,
    });
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

const getInforCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new CustomError(404, "Пользователь не найден");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers, createUser, getUserId, setProfile, setAvatar, getInforCurrentUser, login,
};
