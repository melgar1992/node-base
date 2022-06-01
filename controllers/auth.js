const bcryptjs = require("bcryptjs");
const {
    response
} = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require('../models/usuario');


const login = async (req, res = response) => {

    const {
        correo,
        password
    } = req.body;

    try {

        //Verificar si el email existe

        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / correo no son correcto'
            });
        }

        //Si el usuario esta activo en la BD
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / usuario eliminado'
            });
        }

        //Verificar la contrasena
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password es incorrecto'
            });
        }
        //Generar le JWT

        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login entro',
            token,
            usuario
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        })
    }


}


module.exports = {
    login,
}