// Importo el controllers necesarios para el handler
const {
    getGenresControllers,
} = require("../controllers/genreControllers");

const getGenresHandler = async (req, res) => {
    try {
        const genres = await getGenresControllers(); // Llamamos al controller encargado de buscar los generos
        return res.status(200).json(genres);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getGenresHandler,
    postGenreHandler,
};
