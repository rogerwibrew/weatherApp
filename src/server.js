"use strict";

const getWeather = require("./utils/weather");

const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.use(express.static("public/"));

const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("home", { weather: true });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter a valid location.",
    });
  }
  getWeather(req.query.address).then((response) => {
    res.json(response);
  });
});

app.get("/about", (req, res) => {
  res.render("about", { about: true });
});

app.get("/help", (req, res) => {
  res.render("help", { help: true });
});

app.listen(3000, () => console.log("Sever listening on port 3000"));
