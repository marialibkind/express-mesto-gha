const usersRouter = require("express").Router();
const {
  getUsers, createUser, getUserId, setProfile, setAvatar,
} = require("../controllers/user");

usersRouter.get("/users", getUsers);
usersRouter.post("/users", createUser);
usersRouter.get("/users/:userId", getUserId);
usersRouter.patch("/users/me", setProfile);
usersRouter.patch("/users/me/avatar", setAvatar);

module.exports = usersRouter;
