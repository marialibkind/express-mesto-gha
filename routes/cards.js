const cardsRouter = require("express").Router();
const {getCards, createCard,  deleteCard,  addLikeCard, deleteLikeCard} = require("../controllers/card");

cardsRouter.get("/cards", getCards) 
cardsRouter.post("/cards", createCard) 
cardsRouter.delete("/cards/:cardId", deleteCard) 
cardsRouter.put("/cards", addLikeCard)
cardsRouter.delete("/cards", deleteLikeCard)


module.exports = cardsRouter;
