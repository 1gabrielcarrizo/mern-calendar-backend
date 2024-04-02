// importamos express para que aparezcan las opciones
const {response} = require("express")
const Evento = require("../models/Evento")

const getEventos = async (req, res = response) => {
    // buscamos los eventos con "find" y mostrar el name del user con "populate"
    const eventos = await Evento.find()
                                .populate('user', 'name')

    // si todo esta ok
    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) => {
    // creamos una instancia del modelo de Evento
    const evento = new Evento(req.body)

    // agregamos un trycatch
    try {
        // obtener el id del usuario (el "user" viene del modelo del Evento)
        evento.user = req.uid;

        // guardar en la DB
        const eventoGuardado = await evento.save()

        // si todo esta ok
        return res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async (req, res = response) => {
    // el id del evento viene del "params"
    const eventoId = req.params.id
    // obtener el uid del usuario
    const uid = req.uid

    // agregamos un trycatch
    try {
        // verificar si existe en la DB con "findById"
        const evento = await Evento.findById(eventoId)

        // en caso de no existir...
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe con ese id'
            })
        }
        
        // verificar si la persona que creo el evento es la misma que lo quiere actualizar
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        // creamos un nuevo evento
        const nuevoEvento = {
            ...req.body, // contiene title, notes, etc
            user: uid
        }

        // actualizamos el evento
        // "new: true" muestra el evento actualizado en postman o en thunder client
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true})

        // si todo esta ok
        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarEvento = async (req, res = response) => {
    // el id del evento viene del "params"
    const eventoId = req.params.id
    // obtener el uid del usuario
    const uid = req.uid

    // agregamos un trycatch
    try {
        // verificar si existe en la DB con "findById"
        const evento = await Evento.findById(eventoId)

        // en caso de no existir...
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe con ese id'
            })
        }
        
        // verificar si la persona que creo el evento es la misma que lo quiere actualizar
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

        // eliminar el evento
        await Evento.findByIdAndDelete(eventoId)

        // si todo esta ok
        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}