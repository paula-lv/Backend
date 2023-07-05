const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resensSchema = new Schema ({
    idEmpresa: {
        type: String,
        required: true,
        trim: true
    },
    idUsuario: {
        type: String,
        required: true,
        trim: true,
    },
    estrellas: {
        type: Number,
        required: true,
        trim: true
    },
    mensaje: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true //para guardar la fecha de creación
});

module.exports = mongoose.model('Resena', resensSchema);