const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema ({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    emailAdmin: {
        type: String,
        required: true,
        trim: true,
    },
    cif: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
    direccion: {
        type: String,
        required: false,
        trim: true
    },
    prov: {
        type: String,
        required: false,
        trim: true
    },
    pobl: {
        type: String,
        required: false,
        trim: true
    },
    logo: {
        type: String,
        required: false,
        trim: true
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    img1: {
        type: String,
        trim: true
    },
    img2: {
        type: String,
        trim: true
    },
    img3: {
        type: String,
        trim: true
    },
    horario: {
        type: String,
        trim: true
    },
}, {
    timestamps: true //para guardar la fecha de creación
});

module.exports = mongoose.model('Empresa', empresaSchema);