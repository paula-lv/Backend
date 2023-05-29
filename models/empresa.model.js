const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema ({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String,
        required: true,
        trim: true
    },
    cabecera: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    usuarioAdmin: {
        type: String,
        required: true,
        trim: true
    },
    pswAdmin: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true //para guardar la fecha de creación
});

module.exports = empresaSchema;