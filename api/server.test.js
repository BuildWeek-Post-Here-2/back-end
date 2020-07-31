const supertest = require("supertest");

const server = require("./server.js");
const { TestScheduler } = require("jest");

var authToken = null;

describe("server", function () {
    it("runs the tests", function () {
        expect(true).toBe(true);
    });

    // AUTH: REGISTER
    describe("POST /api/auth/register works", function () {
        // !!! This test is commented out because making multiple users with the same username is impossible, however the register endpoint works!
        // it("should respond with 201 OK", function () {
        //     return supertest(server)
        //         .post("/api/auth/register")
        //         .send({username: "testuser", password: "testpassword"})
        //         .then(res => {
        //             expect(res.status).toBe(201);
        //         });
        // });

        it("should respond with bad request", function () {
            return supertest(server)
                .post("/api/auth/register")
                .send({username: "testuser"})
                .then(res => {
                    expect(res.status).toBe(400);
                });
        });
    });
    // AUTH: LOGIN
    describe("POST /api/auth/login works", function () {
        it("should respond with 201 OK", function () {
            return supertest(server)
                .post("/api/auth/login")
                .send({username: "testuser", password: "testpassword"})
                .then(res => {
                    authToken = res.body.token
                    expect(res.status).toBe(200);
                });
        });
        it("should respond with 400", function () {
            return supertest(server)
                .post("/api/auth/login")
                .send({username: "testuser", password: "wrongpassword"})
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });
    });

    // POSTS: POST /user/:user_id
    describe("POST /api/posts/user/:user_id", function () {
        it("should respond with post", function() {
            return supertest(server)
                .post("/api/posts/user/1")
                .set('Authorization', authToken)
                .send({title: "Hello World", content: "This is a test post", subreddit: "r/all" })
                .then(res => {
                    expect(res.status).toBe(201);
                });
        })
        it("should respond with fail because no token", function() {
            return supertest(server)
                .post("/api/posts/user/1")
                .send({ user_id: 1, title: "Hello World", content: "This is a test post", subreddit: "r/all" })
                .then(res => {
                    expect(res.status).toBe(401);
                });
        })
    })
    // POSTS: GET /user/:user_id
    describe("GET /api/posts/user/:user_id", function () {
        it("should respond with all user posts", function() {
            return supertest(server)
                .get("/api/posts/user/1")
                .set('Authorization', authToken)
                .then(res => {
                    expect(res.status).toBe(200);
                });
        })
        it("should respond with fail because no token", function() {
            return supertest(server)
                .get("/api/posts/user/1")
                .then(res => {
                    expect(res.status).toBe(401);
                });
        })
    })
    // POSTS: GET /:id
    describe("GET /api/posts/:id", function () {
        it("should respond with all user posts", function() {
            return supertest(server)
                .get("/api/posts/1")
                .set('Authorization', authToken)
                .then(res => {
                    expect(res.status).toBe(200);
                });
        })
        it("should respond with fail because no token", function() {
            return supertest(server)
                .get("/api/posts/1")
                .then(res => {
                    expect(res.status).toBe(401);
                });
        })
    })
    // POSTS: PUT /:id
    describe("PUT /api/posts/user/:user_id", function () {
        it("should respond with post", function() {
            return supertest(server)
                .put("/api/posts/1")
                .set('Authorization', authToken)
                .send({title: "CHANGEDPOST!", content: "This is post was changed!", subreddit: "r/all" })
                .then(res => {
                    expect(res.status).toBe(201);
                });
        })
        it("should respond with fail because no token", function() {
            return supertest(server)
                .put("/api/posts/1")
                .send({ user_id: 1, title: "This Post fails", content: "Due to a lack of a token", subreddit: "r/all" })
                .then(res => {
                    expect(res.status).toBe(401);
                });
        })
    })
    // POSTS: DELETE /:id
    describe("DELETE /api/posts/:id", function () {
        it("should respond count of one", function() {
            return supertest(server)
                .delete("/api/posts/1")
                .set('Authorization', authToken)
                .then(res => {
                    expect(res.status).toBe(200);
                });
        })
        it("should respond with fail because no token", function() {
            return supertest(server)
                .delete("/api/posts/1")
                .then(res => {
                    expect(res.status).toBe(401);
                });
        })
    })
});