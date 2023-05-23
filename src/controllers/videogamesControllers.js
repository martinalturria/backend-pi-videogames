const { Videogame, Videogames_Genres } = require("../db");
const getApiGames = require("../helpers/getApiGames");
const getBddGames = require("../helpers/getBddGames");

// Controller para leer todos los games
const getVideogamesController = async () => {
    const gamesApi = await getApiGames();

    let gamesBDD = await getBddGames();

    return [...gamesBDD, ...gamesApi];
};

// Controller para buscar los games por nombre
const findGamesController = async (name) => {
    let allGames = await getVideogamesController();
    const filterGames = [];

    for (const game of allGames) {
        if (filterGames.length === 15) break;

        if (game.name.toLowerCase().includes(name.toLowerCase().slice(0, 6))) {
            filterGames.push(game);
        }
    }

    return filterGames;
};

// Controller para buscar todos los juegos por Id
const findGameByIdController = async (id) => {
    if (!isNaN(Number(id))) return await getApiGames(id);

    return await getBddGames(id);
};

const deleteGameController = async (id) => {
    await Videogame.destroy({ where: { id: id } });

    return;
};

const updateGameController = async (
    id,
    name,
    description,
    platforms,
    image,
    released,
    rating,
    genres
) => {
    await Videogame.update(
        {
            name: name,
            description: description,
            platforms: platforms,
            image: image,
            released: released,
            rating: rating,
        },
        { where: { id: id } }
    );

    await Videogames_Genres.destroy({ where: { VideogameId: id } });

    for (let i = 0; i < genres.length; i++) {
        await Videogames_Genres.create({
            VideogameId: id,
            GenreId: genres[i],
        });
    }

    return "The game was successfully updated";
};

// Controller para crear un nuevo game
const postVideogameController = async (
    name,
    description,
    platforms,
    image,
    released,
    rating,
    genres
) => {
    newGame = await Videogame.create({
        name,
        description,
        platforms,
        image,
        released,
        rating,
    });

    for (let i = 0; i < genres.length; i++) {
        await Videogames_Genres.create({
            VideogameId: newGame.id,
            GenreId: genres[i],
        });
    }

    return newGame;
};

module.exports = {
    getVideogamesController,
    findGamesController,
    findGameByIdController,
    deleteGameController,
    updateGameController,
    postVideogameController,
};
