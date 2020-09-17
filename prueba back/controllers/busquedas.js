const { response } = require('express');

const Usuario = require('../models/usuarios');


const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios ] = await Promise.all([
        Usuario.find({ nombre: regex }),

    ]);

    res.json({
        ok: true,
        usuarios
    })

}

module.exports = {
    getTodo
}