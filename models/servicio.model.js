const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicioSchema = new Schema ({
    idEmpresa: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    duracion: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true //para guardar la fecha de creación
});

module.exports = mongoose.model('Servicio', servicioSchema);