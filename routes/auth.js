const { Router } = require('express');
const { login, googleSingIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasenia es obligatorio').not().isEmpty(),
    validarCampos,
], login );

router.post('/google',[
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos,
], googleSingIn );




module.exports = router;