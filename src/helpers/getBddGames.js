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
        // Mapeo para agregar solamente las propiedades que necesito
        return gamesBDD.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.image,
                rating: game.rating,
                genres: game.Genres.map((genre) => {
                    // Convierto a los genres en un array con los nombres solamente
                    return genre.name;
                }),
                created: game.created,
            };
        });
    }

    const findGame = await Videogame.findByPk(id, condition);

    if(!findGame) throw new Error("No record found with the provided ID")

    // Convierto los datos recibidos desde la BDD exactamente igual a los obtenidos en la API y retorno
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
