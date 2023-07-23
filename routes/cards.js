const cardsRouter = require("express").Router();
const { celebrate } = require("celebrate");
const auth = require("../middlewares/auth");
const {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
} = require("../controllers/card");
const { cardValidation, cardValidationId } = require("../utils/validate");

cardsRouter.get("/cards", auth, getCards);
cardsRouter.post("/cards", auth, celebrate(cardValidation), createCard);
cardsRouter.delete("/cards/:cardId", auth, celebrate(cardValidationId), deleteCard);
cardsRouter.put("/cards/:cardId/likes", auth, celebrate(cardValidationId), addLikeCard);
cardsRouter.delete("/cards/:cardId/likes", auth, celebrate(cardValidationId), deleteLikeCard);

module.exports = cardsRouter;
