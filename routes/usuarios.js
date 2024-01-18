const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, creatUsuarios, updateUsuario, deleteUsuario} = require('../controllers/usuarios');
const { validarJwt, validarADMIN, validarMismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJwt, getUsuarios );

router.post('/', [
    validarJwt,
    validarADMIN,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contrasenia es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
] ,creatUsuarios );

router.put( '/:id', [
    validarJwt,
    validarMismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,
], updateUsuario );

router.delete('/:id', [validarJwt, validarADMIN], deleteUsuario)

module.exports = router;