// 1- importamos mongoose
const mongoose = require('mongoose')

// 2- creamos una funcion
const dbConection = async () => {
    // agregamos un trycatch por si falla la conexion
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log("DB online")
        
    } catch (error) {
        console.log(error)
        throw new Error("Error a la hora de inicializar DB")
    }
}

module.exports = {
    dbConection
}