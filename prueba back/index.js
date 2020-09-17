const express = require('express');
require('dotenv').config();
const cors = require('cors');


const { dbConnection } = require('./database/config');


// Crear SERVIDOR EXPRESS 
const app = express();

// CORS 
app.use(cors());

// LECTURA Y PARSEO DEL BODY
app.use( express.json() );

// BASE DE DATOS 
dbConnection();


// s3B4hAsGaLkIBcX3
// RUTAS 
app.use('/usuarios', require('./routes/usuarios') );
app.use( '/api', require('./routes/busquedas') );





app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT  );
} );