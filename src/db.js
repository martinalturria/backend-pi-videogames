const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const {DB_USER, DB_PASSWORD, DB_HOST, BDD_NAME} = process.env

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD_NAME}`,
    {
        logging: false, // establece que no se muestren los console.log de las consultas realizadas por sequelize
        native: false, // permite que Sequelize sepa que podemos usar pg-native para para opitimizar la velocidad
    }
);

// const sequelize = new Sequelize(
//     `postgresql://postgres:bmR1dyaRTs0Wrus9COkQ@containers-us-west-163.railway.app:6699/railway`,
//     {
//         logging: false, 
//         native: false, 
//     }
// );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos: videogames => Videogames
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
const { Videogame, Genre } = sequelize.models;
// Aca vendrian las relaciones entre las tablas de la BD

Videogame.belongsToMany(Genre, { through: "Videogames_Genres" });
Genre.belongsToMany(Videogame, { through: "Videogames_Genres" });

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Videogame, Genre } = require('./db.js');
    conn: sequelize, // para importar la conexión sequelize con la propiedad conn { conn } = require('./db.js');
};
