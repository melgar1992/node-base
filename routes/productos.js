const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const {crearProducto,} = require('../controllers/productos')



const router = Router();

//obtener todos los productos


//obtener producto


//crear productos
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
] ,crearProducto);

//actualizar producto


//eliminar producto







module.exports = router;