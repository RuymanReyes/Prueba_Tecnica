const { response } = require('express');
const  bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios');

// OBTENER USUARIOS 
const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre apellido email nick  direccion');
    res.json({
        ok: true,
        usuarios,
        _id: req._id
    })
}
const getUsuarioById = async(req, res) => {

    const _id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById( _id );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false, 
                msg: 'No existe un usuario por ese ID'
            })
        } 

        res.json({
            ok: true,
            usuario: usuarioDB
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Error inesperado'
        })
    }
}

// CREAR USUARIOS 

const crearUsuarios = async(req, res) => {
  
    const { email, nombre, apellidos, direccion, nick } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya está registrado'
            })
        }

        const usuario = new Usuario( req.body );

     
       

        // GUARDA EN MONGO 
       await usuario.save();
         
        res.json({
            ok: true,
            usuario,
           
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar los logs'
        });
    }
}

// ACTUALIZAR USUARIO 
const actualizarUsuario = async ( req, res= response ) => {

    const _id = req.params.id;
    

    try {

        const usuarioDB = await Usuario.findById( _id );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false, 
                msg: 'No existe un usuario por ese ID'
            })
        }

    const {email, ...campos} = req.body;

    if ( usuarioDB.email !== email ) {

        const existeEmail = await Usuario.findOne({ email });
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            });
        }
    }
    
    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate( _id, campos, { new: true } );

        
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
         
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

/**
 * BORRAR UN USUARIO
 */

 const borrarUsuario = async( req, res = response ) => {

    const _id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById( _id );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false, 
                msg: 'No existe un usuario por ese ID'
            })
        }

        await Usuario.findByIdAndDelete( _id );

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Error inesperado'
        })
    }

 }




module.exports = {
    getUsuarios,
    getUsuarioById,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario,
}