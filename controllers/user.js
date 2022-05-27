const {
    response,
    request
} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {

    const {
        q,
        nombre = 'No name',
        apikey
    } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
    })
};
const usuariosPost = async (req, res = response) => {
    const {
        nombre,
        correo,
        password,
        rol
    } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });
    //Verificar que el correo exista
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Ese correo ya existe!'
        });
    }
    //Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
        usuario,
    })
};
const usuariosPut = (req, res = response) => {

    const id = req.params.id;
    res.json({
        msg: 'Put API - controlador',
        id,
    })
};
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador',
    })
};
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delte API - controlador',
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}