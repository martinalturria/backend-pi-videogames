const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getApiGames = async (id = undefined) => {
    if (id) {
        const { data } = await axios.get(
            `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        // Devuelvo el objeto con las propiedades a mostrar en Detail, mapeando el nombre de las platforms y los genres
        return {
            id: data.id,
            name: data.name,
            image: data.background_image,
            platforms: data.platforms.map(({ platform }) => {
                return platform.name;
            }),
            description: data.description,
            released: data.released,
            rating: data.rating,
            genres: data.genres.map((genre) => {
                return genre.name;
            }),
        };
    }

    // Genero el Array de Promesas llamando a cada página de la API con su tamaño máximo por página indicado en la Documentacion de la misma, luego al Array se lo paso al Promise.all para optimizar la velocidad de lectura de los games
    const promises = [ axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`        
    ), axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`
    ), axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=40`
    )];

    const results = [];
 
    // Utilizo Promise All para ejecutar todas las promesas y guardar la info necesaria:
    /**
      1- Resuelvo todas las promesas del Array promise que va a tener las promesas de cada pagina
      2- Recorro cada resultado buscando el Array results que es donde viene la info a extraer por api
      3- Recorro cada game dentro del Array data.results para extraer la info que necesito pára cada Game
      4- Por ultimo mapeo el array Genres para extraer cada nombre del genero del game
     */
    await Promise.all(promises)
        .then((response) => {
            response.forEach(({ data }) => {
                data.results.forEach((game) => {
                    results.push({
                        id: game.id,
                        name: game.name,
                        image: game.background_image,
                        rating: game.rating,
                        platform: game.platforms,
                        genres: game.genres.map((genre) => {
                            return genre.name;
                        }),
                        created: false,
                    });
                });
            });
        })
        .catch((error) => {
            throw new Error(error);
        });

    return results;
};

module.exports = getApiGames;
