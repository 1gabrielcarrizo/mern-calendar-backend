/*
Rutas de usuarios / auth
host + /api/auth
*/
const {Router} = require('express');
const {check} = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// creacion de usuarios con "/new"
router.post(
    '/new',
    [ // coleccion de middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(), // es obligatorio y no tiene que ser vacio
        check('email', 'El email es obligatorio').isEmail(), // es obligatorio
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}), // debe tener minimo 6 caracteres
        validarCampos
    ],
    crearUsuario)
// login
router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario)
// obtener el token con "/renew"
router.get('/renew', validarJWT, revalidarToken)

// exportamos router
module.exports = router;