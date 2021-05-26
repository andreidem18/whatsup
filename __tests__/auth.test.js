const app = require('../src/app.js');
const supertest = require('supertest');
const {User} = require("../src/models");
const {authController} = require("../src/controllers/authController.js");

const request = supertest(app);
let id = 0;
let token = "";

describe("Flujo de registro", () => {
    it("Registro exitoso de un usuario", async (done) => {
        const user = {
            firstname: "Pedro",
            lastname: "Sanchez",
            screenname: "screenname",
            email: "pedro@hotmail.com",
            password: "pedro123"
        }
        let response = await request.post("/api/v1/signup").send(user);
        id = response.body.id;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("firstname", "Pedro");
        expect(response.body).toHaveProperty("id");

        done();
    });

    it("Registro fallido de un usuario con correo duplicado", async (done) => {
        const user = {
            firstname: "Pedro",
            lastname: "Sanchez",
            screenname: "screenname",
            email: "pedro@hotmail.com",
            password: "pedro123"
        }

        let response = await request.post("/api/v1/signup").send(user);

        expect(response.status).toBe(409);

        done();
    });

    it("Registro fallido de un usuario con campos vacios", async(done) => {
        const user = {
            firstname: "Pedro",
            lastname: "",
            screenname: "",
            email: "",
            password: "pedro123"
        }

        let response = await request.post("/api/v1/signup").send(user);

        expect(response.status).toBe(403);

        done();
    });
});
afterAll(async() => {
    await User.destroy({where: {id}})
})

describe("Flujo de inicio de sesión", () => {
    it("Inicio de sesión correcto", async(done) => {
        const user = {
            email: "JohnDoe@gmail.com",
            password: "root"
        }
        let response = await request.post("/api/v1/signin").send(user);
        token = response.body.token

        expect(response.status).toBe(200);
        expect(response.body.user.screenname).toBe("John Doe");
        done();
    });

    it("Inicio de sesión fallido con credenciales incorrectas", async(done) => {
        const user = {
            email: "JohnDoe@hotmail.com",
            password: "root"
        }
        let response = await request.post("/api/v1/signin").send(user);

        expect(response.status).toBe(403);
        done();
    });

    it("Inicio de sesión fallido con campos vacios", async(done) => {
        const user = {
            email: "JohnDoe@hotmail.com",
            password: ""
        }
        let response = await request.post("/api/v1/signin").send(user);

        expect(response.status).toBe(403);
        done();
    });

    it("Inicio de sesión fallido de un usuario que no existe en el sistema", async(done) => {
        const user = {
            email: "juan@hotmail.com",
            password: "root"
        }
        let response = await request.post("/api/v1/signin").send(user);

        expect(response.status).toBe(403);
        done();
    });
});

describe("Validación de token", () => {
    it("Token valido", async(done) => {
        let response = await request.get("/api/v1/user").set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        done();
    });

    it("Token invalido", async(done) => {
        let response = await request.get("/api/v1/user").set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
        done();
    });
});