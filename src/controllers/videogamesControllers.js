const { Videogame, Videogames_Genres } = require("../db");
const getApiGames = require("../helpers/getApiGames");
const getBddGames = require("../helpers/getBddGames");

// Controller para leer todos los games
const getVideogamesController = async () => {
    // Llamamos a la funcion helper que nos trae los games de la Api
    const gamesApi = await getApiGames();

    // Traemos los games de la BDD incluyendo el modelo Genre desde la funcion getBddGame
    let gamesBDD = await getBddGames();

    return [...gamesBDD, ...gamesApi];
};

// Controller para buscar los games por nombre
const findGamesController = async (name) => {
    let allGames = await getVideogamesController(); // Reutilizo el Código ya creado para buscar en todos los game, incluyendo los de la BDD
    const filterGames = [];

    for (const game of allGames) {
        // Comparamos que coincidan los nombres y que si ya llego a los 15 resultados, frenamos
        if (filterGames.length === 15) break;

        if (
            game.name.toLowerCase().includes(name.toLowerCase().slice(0, 6)) // Convierto todos los nombres a minusculas para comparalos con el name recibido tambien convertido a minusculas.
        ) {
            filterGames.push(game);
        }
    }

    return filterGames;
};

// Controller para vuscar todos los juegos por Id
const findGameByIdController = async (id) => {
    // Verificamos que el id corresponde a la Api o a la BDD
    if (!isNaN(Number(id))) return await getApiGames(id);

    return await getBddGames(id);
};

const deleteGameController = async (id) => {
    // Como solo podemos eliminar los datos de la BDD verificamos que el id no sea un numero, si no, lanzamos un error    

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
    
    //verifico si el usuario a modificar existe
    await getBddGames(id);

    await Videogame.update(
        // Realizamos la acualizacion del registro
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

    // Actualizo la tabla intermedia, para ello eliminamos las relaciones existente y las volvemos a crear con los nuevos generos asociados
    await Videogames_Genres.destroy({ where: { VideogameId: id } });

    for (let i = 0; i < genres.length; i++) {
        await Videogames_Genres.create({
            VideogameId: id,
            GenreId: genres[i],
        });
    }

    return await getBddGames(id);
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

    // Relaciono el nuevo Game con los generos que nos trae y los existentes
    idGameCreated = newGame.id;

    for (let i = 0; i < genres.length; i++) {
        await Videogames_Genres.create({
            VideogameId: idGameCreated,
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
