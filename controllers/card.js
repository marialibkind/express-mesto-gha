const Card = require("../models/card");

const getCards = async (req, res) => {
    try {
        const cards = await Card.find({});
        res.send(cards)

    } catch (error) {
        res.status(500).send({
            message: "Ошибка на сервере"
        })
    }
}

const createCard = async (req, res) => {
    try {
        const { name, link } = req.body;
        if (!name || !link) {
            res.status(400).send({
                message: "Неверные данные"
            })
            return;
        }
        const card = await Card.create({ name, link, owner: req.user._id });
        if (!card) {
            res.status(404).send({
                message: "Карточка не создана"
            })
            return;
        }
        res.status(201).send(card);
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).send({
                message: "Неверные данные"
            })
            return;
        }
        res.status(500).send({
            message: "Ошибка на сервере"
        })
    }
}

const deleteCard = async (req, res) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.cardId);
        if (!card) {
            res.status(404).send({
                message: "Карточка не найдена"
            })
            return;
        }
        res.send(card);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).send({
                message: "Неверные данные"
            })
            return;
        }
        res.status(500).send({
            message: "Ошибка на сервере"
        })
    }
}

const addLikeCard = async (req, res) => {
    try {
        Card.findByIdAndUpdate(eq.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    } catch (error) {
        if (error.likes === "CastError") {
            res.status(400).send({
                message: "Неверные данные"
            })
            return;
        }
        res.status(500).send({
            message: "Ошибка на сервере"
        })
    }
}

const deleteLikeCard = async (req, res) => {
    try {
        Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    } catch (error) {
        if (error.avatar === "CastError") {
            res.status(400).send({
                message: "Неверные данные"
            })
            return;
        }
        res.status(500).send({
            message: "Ошибка на сервере"
        })
    }
}

module.exports = { getCards, createCard, deleteCard, addLikeCard, deleteLikeCard };
