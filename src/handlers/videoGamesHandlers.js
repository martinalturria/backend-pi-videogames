// Importo los controllers necesarios para cada handler
const {
    postVideogameController,
    getVideogamesController,
    findGamesController,
    deleteGameController,
    updateGameController,
    findGameByIdController,
} = require("../controllers/videogamesControllers");

const getVideogamesHandler = async (req, res) => {
    const { name } = req.query;

    try {
        const games = name
            ? await findGamesController(name)
            : await getVideogamesController();

        if (games.length) return res.status(200).json(games);
        throw new Error("No game found with that name");
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

const getVideoGameHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const findGame = await findGameByIdController(id);
        return res.status(200).json(findGame);
    } catch (error) {
        return res
            .status(404)
            .json({ error: `There is no game associated with that id: ${id}` });
    }
};

const deleteGameHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await deleteGameController(id);
        return res.status(200).json("The game has been deleted successfully");
    } catch (error) {
        return res
            .status(404)
            .json({ error: "There are no games associated with the id" });
    }
};

const updateGameHandler = async (req, res) => {
    const { id } = req.params;
    const { name, description, platforms, image, released, rating, genres } =
        req.body;

    try {
        const gameUpdate = await updateGameController(
            id,
            name,
            description,
            platforms,
            image,
            released,
            rating,
            genres
        );
        return res.status(201).json("The game was successfully updated");
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

const createVideogameHandler = async (req, res) => {
    // Handler donde crearemos los videogame
    const { name, description, platforms, image, released, rating, genres } =
        req.body;

    try {
        await postVideogameController(
            // controller que se encarga de crear el videogame y devolverlo
            name,
            description,
            platforms,
            image,
            released,
            rating,
            genres
        );
        return res.status(201).json("The game was created successfully");
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getVideogamesHandler,
    getVideoGameHandler,
    deleteGameHandler,
    updateGameHandler,
    createVideogameHandler,
};
