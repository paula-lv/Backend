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
    idUsuario: {
        type: String,
        required: true,
        trim: true
    },
    fecha_desde: {
        type: Date,
        required: true,
        trim: true
    },
    fecha_hasta: {
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
        trim: true
    },
    mensaje: {
        type: String,
        trim: true
    }

}, {
    timestamps: true //para guardar la fecha de creación
});

module.exports = mongoose.model('Cita', citaSchema);