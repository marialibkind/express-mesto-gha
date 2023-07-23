const Card = require("../models/card");
const CustomError = require("../errors/customError");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(http2.HTTP_STATUS_INTERNAL_ERROR).send({
      message: "Ошибка на сервере",
    });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    if (!name || !link) {
      res.status(http2.HTTP_STATUS_BAD_REQUEST).send({
        message: "Неверные данные",
      });
      return;
    }
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(http2.HTTP_STATUS_CREATED).send(card);
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

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    const userId = req.user._id;
    if (!card) {
      throw new CustomError(404, "Карточка не найдена");
    }
    if (card.owner.toString() !== userId) {
      throw new CustomError(403, "У вас нет прав");
    }
    await card.deleteOne();
    res.send({ message: "Удалено" });
  } catch (error) {
    next(error);
  }
};

const addLikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(http2.HTTP_STATUS_NOT_FOUND).send({
        message: "лайк не поставлен",
      });
    } else {
      res.send(card);
    }
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

const deleteLikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(http2.HTTP_STATUS_NOT_FOUND).send({
        message: "лайк не удалён",
      });
    } else {
      res.send(card);
    }
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

module.exports = {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
};
