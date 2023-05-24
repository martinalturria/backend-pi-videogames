/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");

const agent = session(app);

describe("route test", () => {
    describe("GET /genres/", () => {
        it("Reply with status: 200", () => {
            () => agent.get("/genres").expect(200);
        });
        it('Returns an Array with the objects of each Genre: [{"id", "name"}, {"id", "name"}]', () => {
            () => {
                const response = agent.get("/genres");
                expect(response.body).to.be.an("array"); 
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

describe("route test", () => {
    describe("GET /videogames/:id", () => {
        it("Reply with status: 200", async () => {
            await agent.get("/videogames/1").expect(200);
        });
        it('Returns an object with the properties: "id", "name", "image", "platforms", "description", "released", "rating", and genres', async () => {
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
        it("If there is an error, respond with status: 404", async () => {
            await agent.get("/videogames/123551355464").expect(404);
        });
    });
});

describe("POST /videogames", () => {
    it("Responds with status: 201 and success message when creating a game", async () => {
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

    it("Responds with status: 400 and error message when sending invalid data to create a game", async () => {
        const invalidGame = {};

        const response = await agent
            .post("/videogames")
            .send(invalidGame)
            .expect(400);

        expect(response.body).to.deep.equal({
            error: "Missing Name",
        });
    });
});
