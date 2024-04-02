const moment = require('moment')

const isDate = (value) => {
    // si regresa false significa que el campo es incorrecto
    if(!value){
        return false;
    }

    // si todo esta okay
    const fecha = moment(value)
    if(fecha.isValid()){
        return true;
    }else{
        return false;
    }
}

module.exports = { isDate }