/*
Ruta: api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario, getUsuarioById } = require('../controllers/usuarios');


const router = Router(); 

router.get( '/', getUsuarios );
 
router.post( '/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El Apellido es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('nick', 'El Nick es obligatorio').not().isEmpty(),
    validarCampos,
],
 crearUsuarios
);

router.put('/:id',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El Apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('nick', 'El Nick es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUsuario
);

router.get('/:id', getUsuarioById );

router.delete('/:id', borrarUsuario );




module.exports = router;