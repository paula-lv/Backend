const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citaSchema = new Schema ({
    idServicio: {
        type: String,
        required: true,
        trim: true
    },
    idEmpresa: {
        type: String,
        required: true,
        trim: true
    },
    idEmpleado: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        trim: true
    },
    valoracion: {
        type: String,
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

module.exports = mongoose.model('Cita', citaSchema);