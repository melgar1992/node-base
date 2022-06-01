const {
    response,
    request
} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    // const {
    //     q,
    //     nombre = 'No name',
    //     apikey
    // } = req.query;

    const {
        limite = 5, desde = 0
    } = req.query;
    const query = {
        estado: true
    };
    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
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
    // const existeEmail = await Usuario.findOne({correo});
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'Ese correo ya existe!'
    //     });
    // }
    //Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
        usuario,
    })
};
const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const {
        password,
        google,
        correo,
        ...resto
    } = req.body;
    if (password) {
        //Encriptar contrasena
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put API - controlador',
        usuario,
    })
};
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador',
    })
};
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    const usuarioAutentificado = req.usuario;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json({
        usuario,
        usuarioAutentificado
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}