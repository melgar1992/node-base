const bcryptjs = require("bcryptjs");
const {
    response
} = require("express");
const { json } = require("express/lib/response");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
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

const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body;

    try {
        const {nombre, img, correo} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo});
        if (!usuario) {
            //Tengo que crear el usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol: 'USER_ROLE',
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado',
            })
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'No se pudo verificar',
            error: error
        })
    }


}

module.exports = {
    login,
    googleSignIn
}