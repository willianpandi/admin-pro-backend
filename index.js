
const express = require('express');
require('dotenv').config();
const cors = require('cors');


const { dbConnection } = require('./database/config');


//crear el servidor express
const app = express();

//CORS
app.use(cors());

//lectura y parseo del body
app.use( express.json() );

// BAse de datos
dbConnection();


//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});