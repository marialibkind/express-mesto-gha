const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? "На сервере ошибка " : error.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
