
const { response } = require('express');
const { isValidObjectId } = require('mongoose');
const { Usuario, Producto, Categoria } = require('../models');



const coleccionesPerminitas = [
    'categorias',
    'productos',
    'usuarios'
];


const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = isValidObjectId(termino); // true

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : [],
        });
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [
            { nombre: regex },
            { correo: regex }
        ],
        $and: [{ estado: true }]
    });
    res.json({
        results: (usuarios),
    });

}
const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = isValidObjectId(termino); // true

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : [],
        });
    }
    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({
        $or: [
            { nombre: regex },
        ],
        $and: [{ estado: true }]
    });

    res.json({
        results: (categorias)
    });

}
const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = isValidObjectId(termino); // true

    if (esMongoID) {
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : [],
        });
    }
    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({
        $or: [
            { nombre: regex },
        ],
        $and: [{ estado: true }]
    });

    res.json({
        results: (productos)
    });

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;
    if (!coleccionesPerminitas.includes(coleccion)) {
        return res.status(400).json({
            msg: `las coleeciones permitidas son : ${coleccionesPerminitas}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'se me olvido realizar la busqueda'
            })
            break;
    }


}

module.exports = {
    buscar
}