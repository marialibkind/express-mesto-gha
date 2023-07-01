require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mestodb", {family: 4});

app.use((req, res, next) => {
  req.user = {
    _id: '649ffd1a88da602f5a65d7c0' 
  };

  next();
});

app.use(router)

app.listen(PORT, () => {
  console.log(`Сервис запущен. Вы в безопасности. Порт: ${PORT}`);
});
