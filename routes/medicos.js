const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJwt } = require('../middlewares/validar-jwt');
const { getMedicos,
    creatMedicos,
    updateMedicos,
    deleteMedicos,
 } = require('../controllers/medicos');

const router = Router();

router.get('/',  getMedicos );

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital uuid debe de ser valido').isMongoId(),
    validarCampos,
] ,creatMedicos );

router.put( '/:id', [
    
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('email', 'El correo es obligatorio').isEmail(),
    // check('role', 'El rol es obligatorio').not().isEmpty(),
    // validarCampos,
], updateMedicos );

router.delete('/:id',  deleteMedicos)

module.exports = router;