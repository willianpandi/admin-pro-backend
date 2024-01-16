const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJwt } = require('../middlewares/validar-jwt');
const { getHospitales,
    creatHospitales,
    updateHospitales,
    deleteHospitales,
 } = require('../controllers/hospitales');

const router = Router();

router.get('/',  getHospitales );

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos,
] ,creatHospitales );

router.put( '/:id', [
    validarJwt,
    check('nombre', 'El nombre del hosppital es obligatorio').not().isEmpty(),
    validarCampos,
], updateHospitales );

router.delete('/:id',  deleteHospitales)

module.exports = router;