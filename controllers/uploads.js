const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");
const path = require('path');
const fs = require('fs');


const cargarArchivos = async (req, res = response) => {


    try {
        const nombreArchivo = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre: nombreArchivo, });
    } catch (error) {
        res.status(400).json({ error });
    }
}
const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No exites un usario con el di ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No exites un producto con el di ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });

            break;
    }

    // Limpiar imagenes previas

    try {
        if (modelo.img) {
            // Hay que borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }
    } catch (error) {
        return res.status(500).json({ msg: `Ups ocurrio un error ${error}` });
    }

    const nombreArchivo = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombreArchivo;

    await modelo.save();

    res.json(modelo);
}

const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No exites un usario con el di ${id}`
                });
            }
       
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No exites un producto con el di ${id}`
                });
            }
    
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });

            break;
    }

    // Limpiar imagenes previas

    try {
        if (modelo.img) {
            // Hay que borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }
    } catch (error) {
        return res.status(500).json({ msg: `Ups ocurrio un error ${error}` });
    }
    const pathNoImage = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathNoImage);


}
module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
}