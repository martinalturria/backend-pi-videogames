const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        "Videogame",
        {
            id: {
                type: DataTypes.UUID, // UUID, nos sirve para generar un id que no se choque con los id numericos de la BD
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4, // Sirve para utilizar el algoritmo de crear el UUID alfanumerico.
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: [1, 150],
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [0, 1500],
                },
            },
            platforms: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            released: {
                type: DataTypes.DATE, // Guardamos como formato fecha a la fecha de lanzamiento
                allowNull: false,
                defaultValue: DataTypes.NOW,
                validate: {
                    isDate: true,
                },
            },
            rating: {
                type: DataTypes.FLOAT, // Va a ser un numero con coma, por eso elegi el formato FLOAT
                allowNull: false,
                validate: {
                    min: 0,
                    max: 5,
                },
            },
            created: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            timestamps: false, // Evitamos creacion de nuevas columnas en la BD
        }
    );
};
