const express = require("express");

const {
  getLinks,
  createLink,
  deleteLink,
} = require("../controllers/link.controller");

const authenticateUser = require("../middlewares/auth.middleware");

const linkRouter = express.Router();

linkRouter.get("/links", authenticateUser, getLinks);
linkRouter.post("/links", authenticateUser, createLink);
linkRouter.delete("/links/:id", authenticateUser, deleteLink);

module.exports = linkRouter;
