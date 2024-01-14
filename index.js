
const express = require('express');
require('dotenv').config();
const cors = require('cors');


const { dbConnection } = require('./database/config');


//crear el servidor express
const app = express();

//CORS
app.use(cors());

// BAse de datos
dbConnection();

// iFVdbmVvHVnISi1I
// willian

//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});


app.listen(process.env.PORT), () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
}