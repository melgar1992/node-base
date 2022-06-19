const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, categoriaDelete } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();


//Obtener toda las categorias
router.get('/', validarJWT, obtenerCategorias);
//Obtener categoria id publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarJWT,
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);
//Crear categoria - privado - cualqueira con un token valido
router.post('/', 
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], 
crearCategoria);//Actualizar - privado - cualquiera con un token valido
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarJWT,
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);//Eliminar - privado - solo un admin puede eliminar
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],categoriaDelete);


module.exports = router;