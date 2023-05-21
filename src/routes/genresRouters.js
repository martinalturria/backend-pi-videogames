const { Router } = require("express");

const {getGenresHandler} = require("../handlers/genresHandlers")

const genresRouters = Router();

genresRouters.get("/", getGenresHandler);

module.exports = genresRouters;
