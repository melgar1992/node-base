const {
    response
} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');



const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY);
        //Obtener el usuario autentificado
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            res.status(401).json({
                msg: 'Token no valido - El usuario no existe en la BD'
            });
        }
        req.usuario = usuario;
        //Verificar que el usuario este su estado en true
        if (!usuario.estado) {
            res.status(401).json({
                msg: 'Token no valido - El usuario tiene estado false'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT,
}