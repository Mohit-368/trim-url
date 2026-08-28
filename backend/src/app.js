const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const linkRouter = require("./routes/link.routes");
const analyticRouter = require("./routes/analytics.routes");
const { redirectLink } = require("./controllers/link.controller");

const app = express();

// Needed so req.ip (used for geoip lookups) reflects the real visitor IP
// when running behind a reverse proxy / load balancer, not the proxy's IP.
app.set("trust proxy", 1);

// The frontend runs on a different origin (Vite dev server) and needs to
// send/receive the httpOnly auth cookie, so credentials must be allowed
// and the origin echoed back explicitly (credentials + "*" is not allowed).
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRouter);
app.use("/api", linkRouter);
app.use("/api", analyticRouter);

// Public redirect route: GET /:trim_link -> redirects to the original URL.
// Kept last so it doesn't shadow the /api routes above.
app.get("/:trim_link", redirectLink);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;