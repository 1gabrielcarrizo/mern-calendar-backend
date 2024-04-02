const {response} = require("express")
const {validationResult} = require("express-validator")

// se agrega el "next" el cual es un callback
const validarCampos = (req, res = response, next) => {
    // manejo de errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped() // todos los errores se encuentran aqui
        })
    }
    // si todo esta ok, llamamos al next
    next()
}

module.exports = {
    validarCampos
}