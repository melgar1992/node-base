const {
    response,
    request
} = require("express");
const {
    Producto, Categoria,
} = require("../models");
const categoria = require("../models/categoria");


//Crear producto
const crearProducto = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    
    const productoDB = await Producto.findOne({
        nombre
    });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe `
        });

    }
    //Generar la data

    const data = {
        nombre,
        usuario: req.usuario._id,
        categoria: req.body.categoria,
        precio: req.body.precio,
        descripcion: req.body.descripcion
    }
    const producto = new Producto(data);
    //Guardar en la DB
     await producto.save();

    res.json({
        msg: 'crear Producto',
        producto,
    })
}

//Obtener todos los productos
const obtenerProductos = async (req = request, res = response) => {
    res.json({
        msg: 'obtener productos'
    })
}


//Obtener producto
const obtenerProducto = async (req = request, res = response) => {
    res.json({
        msg: 'obtener Producto'
    })
}


//Editar producto
const actualizarProducto = async (req = request, res = response) => {
    res.json({
        msg: 'actualizar Producto'
    })
}


//Eliminar producto

const productoDelete = async (req = request, res = response) => {
    res.json({
        msg: 'eliminar Producto'
    })
}



module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    productoDelete
}
