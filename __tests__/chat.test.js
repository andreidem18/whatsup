describe("Funcionalidad de las salas de chat", () => {
    it("Crear la sala de chat Vengadores", () => {

    });

    it("Creación fallida de una sala de chat con el mismo nombre", () => {

    });

    it("Obtener las salas de chat", () => {

    });
});

describe("Miembros de una sala de chat", () => {
    it("Agregando 2 miembros a una sala de chat Vengadores", () => {

    });

    it("Obtener los miembros de la sala de chat Vengadores", () => {

    });

    it("Petición fallida al tratar de agregar los mismos miembros a la sala Vengadores", () => {

    });

    it("Eliminar los miembros de la sala de chat excepto el creador de la sala de chat", () => {

    });

    it("Petición fallida al tratar de eliminar al creador de la sala Vengadores", () => {

    });

    it("Volver a agregar los 2 miembros a la sala de chat Vengadores", () => {

    });
    
});

describe("Envio de mensajes en la sala de chat Avengers", () => {
    it("Envio de mensaje por el administrador de la sala", () => {

    });

    it("Envío de mensaje por otro miembro de la sala", () => {

    });

    it("Envío fallido de un mensaje por parte de usuario que no pertenezca a la sala", () => {
        //Implementar la lógica necesaria en el controlador
    });

});

//Usar la función beforeAll para poder iniciar sesión y guardar token
//Usar la función beforeAll para poder registrar 2 usuarios antes de las pruebas sobre el set "Miembros de una sala de chat"