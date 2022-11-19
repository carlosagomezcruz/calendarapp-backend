/*
Rutas de usuarios / Auth
host + /api/auth 
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/new', [
    //Middleware
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario);

router.post('/', [
    //Middleware
    check('email', 'El usuario es obligatorio y debe ser un email').not().isEmpty().isEmail(),
    check('password', 'El password debe ser de minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;