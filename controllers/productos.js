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
    const uid = req.usuario._id;

    const {
        limite = 5,
        desde = 0
    } = req.query;

    const query = {
        estado: true,
        usuario: uid,
    };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query).limit(limite),
        Producto.find(query).populate('usuario', 'nombre').populate('categoria', 'nombre').skip(desde).limit(limite)
    ]);

    res.json({
        productos,
        total
    });
}


//Obtener producto
const obtenerProducto = async (req = request, res = response) => {
    const {
        id
    } = req.params;

    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json({
        producto
    });


}

//Editar producto
const actualizarProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id, data);
    res.json({
        producto,
        data,
    });
}


//Eliminar producto

const productoDelete = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false });
    res.json({
        producto,
    })
}



module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    productoDelete
}
