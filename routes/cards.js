const cardsRouter = require("express").Router();
const {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
} = require("../controllers/card");

cardsRouter.get("/cards", getCards);
cardsRouter.post("/cards", createCard);
cardsRouter.delete("/cards/:cardId", deleteCard);
cardsRouter.put("/cards/:cardId/likes", addLikeCard);
cardsRouter.delete("/cards/:cardId/likes", deleteLikeCard);

module.exports = cardsRouter;
