const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    psw: {
        type: String,
        required: true,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
    },
    prov: {
        type: String,
        required: true,
        trim: true
    },
    pobl: {
        type: String,
        required: true,
        trim: true
    },
    idEmpresa: {
        type: String,
    },
    
}, {
    timestamps: true //para guardar la fecha de creación
});

module.exports = userSchema;