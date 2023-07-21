const router = require("express").Router();

const cardsRouter = require("./cards");
const usersRouter = require("./users");

router.use(cardsRouter);
router.use(usersRouter);

router.use((req, res) => {
  res.status(http2.HTTP_STATUS_NOT_FOUND).send({
    message: "Такой страницы нет",
  });
});

module.exports = router;
