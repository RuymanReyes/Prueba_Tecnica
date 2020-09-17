const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String, 
        required: true,
    },
    apellido: {
        type: String, 
        required: true,
        
    },
    nick: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    direccion: {
        type: String, 
        requiredrequire: true,
        
    },

});


// Si queremos cambiar el _id por uid, es de esta manera, 
// lo dejamos como _id

UsuarioSchema.method('toJSON', function(){
    const {__v, password, ...object} = this.toObject();
    // object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);