const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGamesRouter = require("./videoGamesRouters")
const genresRouters = require("./genresRouters")

const router = Router();

// Enviamos a la Request segun corresponda su ruta
router.use("/videogames", videoGamesRouter)
router.use("/genres", genresRouters)



module.exports = router;
