const validateGetName = (req, res, next) => {
    const { name } = req.query;
    if (name === "") return res.status(400).json({ error: "no name entered" });

    next();
};

const validateDeleteId = (req, res, next) => {
    const { id } = req.params;
    if (!isNaN(Number(id)))
        return res.status(400).json({ error: "Wrong id, cannot delete" });

    next();
};

const validateUpdatePostById = (req, res, next) => {
    const { name, description, platforms, image, released, rating } =
        req.body;
    const { id } = req.params;
    // Como solo podemos modificar los datos de la BDD verificamos que el id no sea un numero, si no, lanzamos un error
    if (!isNaN(Number(id)))
        return res.status(400).json({ error: "not the correct id" });

    if (!name) return res.status(400).json({ error: "Missing Name" });
    if (!description)
        return res.status(400).json({ error: "Missing Description" });
    if (!platforms.length) return res.status(400).json({ error: "Missing Platforms" });
    if (!image) return res.status(400).json({ error: "Missing Image" });
    if (!released) return res.status(400).json({ error: "Missing Released" });
    if (!rating) return res.status(400).json({ error: "Missing Rating" });

    next();
};

module.exports = {
    validateGetName,
    validateDeleteId,
    validateUpdatePostById,
};
