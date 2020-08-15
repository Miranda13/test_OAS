module.exports = function (databaseConfig) {

    const express = require('express');
    const router = express.Router();
    const TABLE = 'partidos';
    const general = require('../utils/general')();
    let model = general.getDatabaseModel();
    

    //{{SERVER}}/partidos/ 
    //Lista todos los partidos
    router.get('/', function (request, response) {
       model.getAll(TABLE)
            .then((rows) => {
                response.send(rows);
            }).catch((error) => {
                console.error(error);
                response.send(error);
            });
    });

    //{{SERVER}}/partidos/id 
    //Trae un partido por ID
    router.get('/:id', function (request, response) {
        let id = request.params.id;
        model.getById(TABLE, id)
            .then((row) => {
                response.send(row);
            }).catch((error) => {
                console.error(error);
                response.send(error);
            });
    });

    //{{SERVER}}/partidos/
    //Crea un partido
    router.post('/', function (request, response) {
        model.create(TABLE, request.body)
            .then((object) => {
                response.send(object)
            }).catch((error) => {
                console.error(error);
                response.send(error);
            });
    });

    //{{SERVER}}/partidos/:id
    //Edita un partido
    router.put('/:id', function (request, response) {
        let id = request.params.id;
        model.update(TABLE, request.body, id)
            .then((row) => {
                response.send(row);
            }).catch((error) => {
                console.error(error);
                response.send(error);
            });
    });


    //{{SERVER}}/partidos/id
    //Elimina un partido
    router.delete('/:id', function (request, response) {
        let id = request.params.id;
            model.delete(TABLE, id)
                .then((message) => {
                    response.send(message);
                }).catch((error) => {
                    console.error(error);
                    response.send(error);
                });
    });


    //{{SERVER}}/partidos/delete_partidos
    //Limpiar tabla
    router.get('/option/clean', function (request, response) {
        model.clean(TABLE)
            .then((message) => {
                response.send(message)
            }).catch((error) => {
                console.error(error);
                response.send(error);
            });
    });

    return router;
}