require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(auth);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);


app.use((res, req, next) => {
});

app.listen(PORT, () => {
  console.log(`Сервис запущен. Вы в безопасности. Порт: ${PORT}`);
});