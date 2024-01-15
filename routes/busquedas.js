const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJwt } = require('../middlewares/validar-jwt');
const { getBusqueda, getDocumentoBusqueda } = require('../controllers/busqueda');

const router = Router();

router.get('/:busqueda', validarJwt, getBusqueda );
router.get('/coleccion/:tabla/:busqueda', validarJwt, getDocumentoBusqueda );

module.exports = router;