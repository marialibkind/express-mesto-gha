const usersRouter = require("express").Router();
const { celebrate } = require("celebrate");
const {
  getUsers, createUser, getUserId, setProfile, setAvatar, getInforCurrentUser, login,
} = require("../controllers/user");
const auth = require("../middlewares/auth");
const { userValidation, userUpdateValidation } = require("../utils/validate");

usersRouter.post("/signup", celebrate(userValidation), createUser);
usersRouter.post("/signin", celebrate(userValidation), login);

usersRouter.get("/users", auth, getUsers);
usersRouter.get("/users/:userId", auth, celebrate(userValidation), getUserId);

usersRouter.get("/users/me", auth, getInforCurrentUser);
usersRouter.patch("/users/me", auth, celebrate(userUpdateValidation), setProfile);
usersRouter.patch("/users/me/avatar", auth, celebrate(userUpdateValidation), setAvatar);

module.exports = usersRouter;
