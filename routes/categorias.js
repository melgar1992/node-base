const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares');


const router = Router();


//Obtener toda las categorias
router.get('/', (req, res) => {
    res.json('get');
});
//Obtener categoria id publico
router.get('/:id', (req, res) => {
    res.json('get id');
});
//Crear categoria - privado - cualqueira con un token valido
router.post('/', [validarJWT], (req, res) => {
    res.json('crear');
});//Actualizar - privado - cualquiera con un token valido
router.put('/:id', (req, res) => {
    res.json('Actualizar');
});//Eliminar - privado - solo un admin puede eliminar
router.delete('/:id', (req, res) => {
    res.json('Borrar');
});


module.exports = router;