const express = require("express");
const { getAnalytics } = require("../controllers/analytics.controller");
const authenticateUser = require("../middlewares/auth.middleware");

const analyticRouter = express.Router();

analyticRouter.get("/analytic/:id", authenticateUser, getAnalytics);

module.exports = analyticRouter;
