/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");

const agent = session(app);

describe("Test de RUTAS", () => {
    describe("GET /genres/", () => {
        it("Responde con status: 200", () => {
            () => agent.get("/genres").expect(200);
        });
        it('Responde un Array con los objetos de cada Genre: [{"id", "name"}, {"id", "name"}]', async () => {
            () => {
                const response = agent.get("/genres");
                expect(response.body).to.be.an("array"); // Verifica que la respuesta sea un array
                expect(
                    response.body.every(
                        (obj) =>
                            obj.hasOwnProperty("id") &&
                            obj.hasOwnProperty("name")
                    )
                );
            };
        });
    });
});

describe("Test de RUTAS", () => {
    describe("GET /videogames/:id", () => {
        it("Responde con status: 200", async () => {
            await agent.get("/videogames/1").expect(200);
        });
        it('Responde un objeto con las propiedades: "id", "name", "image", "platforms", "description", "released", "rating" y genres', async () => {
            const response = await agent.get("/videogames/1");
            expect(response.body).to.include.all.keys(
                "id",
                "name",
                "image",
                "platforms",
                "description",
                "released",
                "rating",
                "genres"
            );
        });
        it("Si hay un error responde con status: 404", async () => {
            await agent.get("/videogames/123551355464").expect(404);
        });
    });
});

describe("POST /videogames", () => {
    it("Responde con status: 201 y mensaje de éxito al crear un juego", async () => {
        const newGame = {
            name: "Super Mario",
            description: "A fantastic adventure with Mario.",
            platforms: ["Nintendo Switch"],
            image: "https://example.com/super-mario-odyssey.jpg",
            released: "2017-10-27",
            rating: 4.8,
            genres: [2, 4],
        };

        () => {
            const response = agent
                .post("/videogames")
                .send(newGame)
                .expect(201);

            expect(response.body).to.equal("The game was created successfully");
        };
    });

    it("Responde con status: 400 y mensaje de error al enviar datos inválidos para crear un juego", async () => {
        const invalidGame = {
            // Propiedades faltantes o inválidas para crear un juego
        };

        const response = await agent
            .post("/videogames")
            .send(invalidGame)
            .expect(400);

        expect(response.body).to.deep.equal({
            error: "Missing Name",
        });
    });
});
