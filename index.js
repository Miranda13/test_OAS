const express = require('express');
const app = express();
const config = require('./config.json');
const cors = require('cors');

const port = process.env.PORT ? process.env.PORT : config.app.port ? config.app.port : 3000;

app.use(cors());

//URL Encode Support for POST, PUT Methods
const bodyParser = require('body-parser');

let gruposController = require('./app/controllers/grupos')()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//{{SERVER}}/grupos/
app.use('/grupos', usersController);

app.get('/', (request, response) => {
    response.send('Bienvenido a la API de ' + config.app.name);
});

app.listen(port,function () {
    console.log('***********************************');
    console.log("*************Running***************");
    console.log('Aplicación: ' + config.app.name);
    console.log('***********************************');
})