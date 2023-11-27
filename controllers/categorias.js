const {
    response,
    request
} = require("express");
const {
    Categoria,
} = require("../models");

//obtenerCategorias - paginado - total - populate

const obtenerCategorias = async (req = request, res = response) => {

    const uid = req.usuario._id;

    const {
        limite = 5,
            desde = 0
    } = req.query;

    const query = {
        estado: true,
        usuario: uid,
    };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query).limit(limite),
        Categoria.find(query).populate('usuario', 'nombre').skip(desde).limit(limite)
    ]);

    res.json({
        categorias,
        total
    });


}



//obtenerCategoria - populate

const obtenerCategoria = async (req = request, res = response) => {

    const {
        id
    } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        categoria
    });
}


const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({
        nombre
    });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe `
        });

    }

    //Generar la data
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //Guardar en la BD
    await categoria.save();
    
    res.json({
        categoria,
    })

}


//actualizarCategoria

const actualizarCategoria = async (req = request, res = response) => {

    const {id} = req.params;
    const {estado , usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id, data);
    res.json({
        categoria,
        data,
    });
}

//borrarCategoria - estado: false
const categoriaDelete = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
    res.json({
        categoria,
    })
};



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    categoriaDelete
}