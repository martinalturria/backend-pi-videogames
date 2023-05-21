// HELPER ENCARGADA DE TRAER LOS GENRES DE LA API Y GUARDARLOS EN LA BDD..
const { Genre } = require("../db");
const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;

const saveGenreBdd = async () => {
    const { data } = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
    );

    for (const result of data.results) {
        await Genre.create({
            name: result.name,
        });
    }

    return await Genre.findAll()
};

module.exports = saveGenreBdd;
