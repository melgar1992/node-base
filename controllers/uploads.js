const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");



const cargarArchivos = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos a subir' });
    }

    try {
        const nombreArchivo = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre: nombreArchivo, })
    } catch (error) {
        res.status(400).json({ error })
    }
}



module.exports = {
    cargarArchivos
}