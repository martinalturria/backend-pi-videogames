const { Router } = require("express");
// Importamos los handlers
const {
    getVideogamesHandler,
    getVideoGameHandler,
    deleteGameHandler,
    updateGameHandler,
    createVideogameHandler,
} = require("../handlers/videoGamesHandlers");

// Importamos los Middlewares para las validaciones
const {
    validateGetName,
    validateDeleteId,
    validateUpdatePostById,
} = require("../middlewares/validates");

const videoGamesRouter = Router();

// Configuramos cada metodo HTTP, llamando a su correspondiente validacion o Handler
videoGamesRouter.get("/", validateGetName, getVideogamesHandler);

videoGamesRouter.get("/:id", getVideoGameHandler);
videoGamesRouter.delete("/:id", validateDeleteId, deleteGameHandler);
videoGamesRouter.put("/:id", validateUpdatePostById, updateGameHandler);

videoGamesRouter.post("/", validateUpdatePostById, createVideogameHandler);

module.exports = videoGamesRouter;
