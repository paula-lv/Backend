const mongoose = require('mongoose');
const empresaSchema = require('../models/empresa.model');

empresaSchema.statics = {
    create: function (data, cb) {
        const empresa = new this(data);
        empresa.save(cb);
    }
}

const empresaModel = mongoose.model('Empresas', empresaSchema);
module.exports = empresaModel;