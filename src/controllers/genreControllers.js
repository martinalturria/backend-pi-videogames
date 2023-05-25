const { Genre } = require("../db"); // Importamos el modelo a utilizar para la BDD
const saveGenreBdd = require("../helpers/saveGenreBdd"); // Importo la funcion helper encargada de guardar los generos en la BDD

const getGenresControllers = async () => {
    let genresBdd = await Genre.findAll();

    if (!genresBdd.length) return await saveGenreBdd();

    return genresBdd;
};



module.exports = {
    getGenresControllers,
};
