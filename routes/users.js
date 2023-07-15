const usersRouter = require("express").Router();
const {
  getUsers, createUser, getUserId, setProfile, setAvatar,
} = require("../controllers/user");

usersRouter.get("/users", getUsers);
usersRouter.post("/users", createUser);
usersRouter.get("/users/:userId", getUserId);
usersRouter.put("/users", setProfile);
usersRouter.delete("/users", setAvatar);

module.exports = usersRouter;
