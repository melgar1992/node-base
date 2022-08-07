const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const { existeCategoriaPorId, existeProductoPorId, existeNombreProducto } = require('../helpers/db-validators');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, productoDelete, } = require('../controllers/productos')



const router = Router();

//obtener todos los productos
router.get('/', [
    validarJWT,
], obtenerProductos)

//obtener producto
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos

], obtenerProducto);

//crear productos
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos,
    check('nombre').custom(existeNombreProducto),
    validarCampos
], crearProducto);

//actualizar producto
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
   
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos,
    check('id').custom(existeProductoPorId),
    validarCampos,
    check('nombre').custom(existeNombreProducto),
    validarCampos
], actualizarProducto);

//eliminar producto
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos,
], productoDelete);






module.exports = router;