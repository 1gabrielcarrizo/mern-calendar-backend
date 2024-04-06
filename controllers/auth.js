// importamos express para que aparezcan las opciones
const {response} = require("express")
const Usuario = require("../models/Usuario")
const bcrypt = require('bcryptjs')
const { generarJWT } = require("../helpers/jwt")

const crearUsuario = async (req, res = response) => {
    // extraer datos del body
    const {email, password} = req.body

    // agregamos un trycatch
    try {
        // verificamos con mongoose si el email ya existe
        let usuario = await Usuario.findOne({email})

        // puede regresar un objeto o null
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            })
        }

        // creamos una instancia de nuestro modelo Usuario
        usuario = new Usuario(req.body)
    
        // encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        // grabarlo en la DB (el save es asincrono)
        await usuario.save()

        // generar JWT
        const token = await generarJWT(usuario.id, usuario.name)
    
        // respuesta ok
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const loginUsuario = async (req, res = response) => {
    // extraer datos del body
    const {email, password} = req.body

    // agregamos un trycatch
    try {
        // verificamos con mongoose si el email ya existe
        const usuario = await Usuario.findOne({email})

        // puede regresar un objeto o null
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        // confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const revalidarToken = async (req, res = response) => {
    // obtenemos el "uid" y el "name" del "req.uid" modificado en la ruta middleware > validar-jwt.js
    const {uid, name} = req

    // generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name)

    // si todo esta okay
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}