// 1- importamos Schema y model de mongoose
const {Schema, model} = require('mongoose')

// 2- definimos que valores se guardaran en el esquema
const UsuarioSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema)