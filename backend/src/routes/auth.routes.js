const express = require("express");
const authenticateUser = require("../middlewares/auth.middleware");

const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", authController.registerController);
authRouter.post("/login", authController.loginController);
authRouter.post("/logout", authController.logoutController);
authRouter.get("/me", authenticateUser, authController.meController);

module.exports = authRouter;
