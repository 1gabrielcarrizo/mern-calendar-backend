/*
Event Routes
/api/events
*/
const {Router} = require('express')
const {check} = require('express-validator')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')
const router = Router()

// todas tienen que pasar por la validacion del JWT, "validarJWT" pasara por el get, post, put y delete
router.use(validarJWT);

// obtener eventos
router.get('/', getEventos)

// crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos // contiene todos los errores
    ],
    crearEvento)

// actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos // contiene todos los errores
    ],
    actualizarEvento)

// eliminar evento
router.delete('/:id', eliminarEvento)

module.exports = router;