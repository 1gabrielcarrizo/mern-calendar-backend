// 1- importamos jwt
const jwt = require('jsonwebtoken')

// 2- creamos una funcion, recibe lo que viene en el "payload"
const generarJWT = (uid, name) => {
    // retornar una promesa
    return new Promise((resolve, reject) => {
        //creamos el payload
        const payload = {uid, name}
        // la firma del token tiene el payload, una clave secreta y la duracion
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            // si hay un error
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }
            // si todo esta ok
            resolve(token)
        })
    })
}

module.exports = {
    generarJWT
}