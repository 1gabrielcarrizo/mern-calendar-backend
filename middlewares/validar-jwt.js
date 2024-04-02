const {response} = require("express")
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
    // "x-token" porque asi lo definimos en los headers en el postman o en el thunder client
    const token = req.header('x-token')

    // validar el JWT
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    // agregamos un trycatch
    try {
        // extraemos uid y el name del payload
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        // cualquier peticion que haya pasado por el JWT puede obtener el uid y el name
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    // si todo esta ok llamar al next()
    next()
}

module.exports = {
    validarJWT
}