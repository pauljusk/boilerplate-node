const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const routes = require("./routes/");
const ApiError = require("./utils/ApiError");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3301"],
  })
);

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/", routes);

app.get("/test", (req, res) => {
  res.send("hello world");
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
