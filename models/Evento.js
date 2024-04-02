// 1- importamos Schema y model de mongoose
const {Schema, model} = require('mongoose')

// 2- definimos que valores se guardaran en el esquema
const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: { // saber quien hizo el evento
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

EventoSchema.method('toJSON', function(){
    // extramos las propiedades que queremos mostrar solamente en el postman o en el thunder client
    const {__v, _id, ...object} = this.toObject()
    object.id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema)