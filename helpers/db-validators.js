const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado`);
    }

};
const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`);

    }
}
const existeUsuarioPorId = async (id) => {
    const existeID = await Usuario.findOne({ id });
    if (!existeID) {
        throw new Error(`El id ${id} no existe`);

    }
}
const existeCategoriaPorId = async (id) => {
    const existeID = await Categoria.findById(id);
    if (!existeID) {
        throw new Error(`El id ${id} no existe`);

    }
}
const existeProductoPorId = async (id) => {
    const existeID = await Producto.findById(id);
    if (!existeID) {
        throw new Error(`El id ${id} del producto no existe`);

    }
}
const existeNombreProducto = async (nombre) => {
    const nombre2 = nombre.toUpperCase();
    const existe = await Producto.findOne({
        nombre: nombre2
    });
    if (existe) {
        throw new Error(`El producto ${existe.nombre}, ya existe `);

    }
}
//Validar colecciones permitidas

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`la colecccion ${coleccion} no es permitida, ${colecciones} son permitidas`);
    }
    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeNombreProducto,
    coleccionesPermitidas,
}