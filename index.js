// 1- asi se importa en el back
const express = require("express")
require("dotenv").config()
const cors = require('cors')
const { dbConection } = require("./database/config")

// console.log(process.env)

// 2- crear el servidor de express
const app = express()

// 6- base de datos
dbConection();

// 7 - CORS
app.use(cors())

// directorio publico
app.use(express.static('public'))

// 5- lectura y parseo del body
app.use(express.json());

// 3- rutas
// especificamos la ruta del endpoint (auth)
app.use('/api/auth', require('./routes/auth'));
// CRUD: Eventos
app.use('/api/events', require('./routes/events'))

// 4- escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})