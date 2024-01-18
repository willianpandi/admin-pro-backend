const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJwt } = require('../middlewares/validar-jwt');

const { getMedicos,
    creatMedicos,
    updateMedicos,
    deleteMedicos,
    getMedicoById,
 } = require('../controllers/medicos');

const router = Router();

router.get('/', validarJwt,  getMedicos );

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital uuid debe de ser valido').isMongoId(),
    validarCampos,
] ,creatMedicos );

router.put( '/:id', [
    validarJwt,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital uuid debe de ser valido').isMongoId(),
    validarCampos,
], updateMedicos );

router.delete('/:id', validarJwt ,deleteMedicos)

router.get('/:id', validarJwt,  getMedicoById );
module.exports = router;