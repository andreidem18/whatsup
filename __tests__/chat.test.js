const app = require('../src/app.js');
const supertest = require('supertest');
const {Room, Member} = require("../src/models");

const request = supertest(app);
let token = "";
let userId = 0;
let roomId = 0;
let members = {};

beforeAll(async () => {
    const user = {
        email: "boby@gmail.com",
        password: "12345"
    }
    let response = await request.post("/api/v1/signin").send(user);
    userId = response.body.user.id;
    token = response.body.token;
})

describe("FuncionalroomIdad de las salas de chat", () => {
    it("Crear la sala de chat Vengadores", async(done) => {
        const room = {
            name: "Vengadores",
            screenname: "colegas",
            private: false,
            avatar: "http:localhost:8000/public/static/img/uploads/user.jpg"
        }

        let response = await request
            .post("/api/v1/rooms")
            .send(room)
            .set('Authorization', `Bearer ${token}`);

        roomId = response.body.id;

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Vengadores");
        done();
    });

    it("Creación fallida de una sala de chat con el mismo nombre", async(done) => {
        const room = {
            name: "Vengadores",
            screenname: "colegas",
            private: false,
            avatar: "http:localhost:8000/public/static/img/uploads/user.jpg"
        }

        let response = await request
            .post("/api/v1/rooms")
            .send(room)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(403);
        done();
    });

    it("Obtener las salas de chat", async(done) => {
        let response = await request
            .get("/api/v1/rooms")
            .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body[0].name).toBe("Team react");
            done();
    });
});




describe("Miembros de una sala de chat", () => {
    it("Agregando 2 miembros a una sala de chat Vengadores", async(done) => {
        
        members = {members: [1,3]};

        let response = await request
            .post(`/api/v1/rooms/${roomId}/members`)
            .send(members)
            .set('Authorization', `Bearer ${token}`);


        expect(response.status).toBe(201);
        expect(response.body[0].userId).toBe(1);
        expect(response.body[1].roomId).toBe(roomId);
        done();
    });

    it("Obtener los miembros de la sala de chat Vengadores", async(done) => {
        let response = await request
            .get(`/api/v1/rooms/${roomId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.Users[0].screenname).toBe("Boby");
        expect(response.body.Users.length).toBe(3);
        done();
    });

    it("Petición fallida al tratar de agregar los mismos miembros a la sala Vengadores", async(done) => {
        
        let response = await request
            .post(`/api/v1/rooms/${roomId}/members`)
            .send(members)
            .set('Authorization', `Bearer ${token}`);


        expect(response.status).toBe(403);
        done();
    });

    it("Eliminar los miembros de la sala de chat excepto el creador de la sala de chat", async(done) => {

        let response = await request
            .delete(`/api/v1/rooms/${roomId}/members`)        
            .send(members)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        done();
    });

    it("Petición fallida al tratar de eliminar al creador de la sala Vengadores", async(done) => {
        let response = await request
            .delete(`/api/v1/rooms/${roomId}/members`)        
            .send({members: [2]})
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        done();
    });

    it("Volver a agregar los 2 miembros a la sala de chat Vengadores", async(done) => {
        let response = await request
            .post(`/api/v1/rooms/${roomId}/members`)
            .send(members)
            .set('Authorization', `Bearer ${token}`);


        expect(response.status).toBe(201);
        expect(response.body[0].userId).toBe(1);
        expect(response.body[1].roomId).toBe(roomId);
        done();
    }); 
    
});

describe("Envio de mensajes en la sala de chat Avengers", () => {
    it("Envio de mensaje por el administrador de la sala", async(done) => {
        const text = {text: "Hello world"};

        let response = await request
            .post(`/api/v1/rooms/${roomId}/messages`)
            .send(text)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);
        expect(response.body.text).toBe("Hello world");
        expect(response.body.userId).toBe(userId);
        done();
    });

    it("Envío de mensaje por otro miembro de la sala", async(done) => {
        let user = {
            email: "JohnDoe@gmail.com",
            password: "root"
        }
        user = await request.post("/api/v1/signin").send(user);
        token = user.body.token;
        const text = {text: "Hello!"};

        let response = await request
            .post(`/api/v1/rooms/${roomId}/messages`)
            .send(text)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);
        expect(response.body.text).toBe("Hello!");
        expect(response.body.userId).toBe(user.body.user.id);
        done();
    });

    it("Envío fallido de un mensaje por parte de usuario que no pertenezca a la sala", async(done) => {
        let user = {
            email: "brad@gmail.com",
            password: "brad123"
        }
        user = await request.post("/api/v1/signin").send(user);
        token = user.body.token;
        const text = {text: "Whatsup!"};

        let response = await request
            .post(`/api/v1/rooms/${roomId}/messages`)
            .send(text)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(403);
        done();
    });

});


afterAll(async() => {
    await Member.destroy({where: {room_id: roomId}});

    await Room.destroy({where: {id: roomId}});
});

// Usar la función beforeAll para poder iniciar sesión y guardar token
//Usar la función beforeAll para poder registrar 2 usuarios antes de las pruebas sobre el set "Miembros de una sala de chat"
