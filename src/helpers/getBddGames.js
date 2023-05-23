const { Videogame, Genre } = require("../db");

const getBddGames = async (id = undefined) => {
    const condition = {
        include: {
            model: Genre,
            attributes: ["id", "name"],
            through: {
                attributes: [],
            },
        },
    };

    if (!id) {
        const gamesBDD = await Videogame.findAll(condition);
        return gamesBDD.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.image,
                rating: game.rating,
                genres: game.Genres.map((genre) => {
                    return genre.name;
                }),
                created: game.created,
            };
        });
    }

    const findGame = await Videogame.findByPk(id, condition);

    return {
        id: findGame.id,
        name: findGame.name,
        image: findGame.image,
        platforms: findGame.platforms,
        description: findGame.description,
        released: findGame.released,
        rating: findGame.rating,
        genres: findGame.Genres,
    };
};

module.exports = getBddGames;
