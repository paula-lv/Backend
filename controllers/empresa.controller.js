const Empresa = require('../models/empresa.model')
const bcrypt = require('bcryptjs');

exports.crearEmpresa = async(req, res) => {
    try {
        let newEmpresa;

        newEmpresa = new Empresa({
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            descripcion: req.body.descripcion,
            logo: "",
            cabecera: req.body.cabecera,
            color: req.body.color,
            emailAdmin: req.body.emailAdmin,
            pswAdmin: bcrypt.hashSync(req.body.pswAdmin)
        });
    
        await newEmpresa.save();
        res.send(newEmpresa)

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerEmpresas = async(req, res) => {
    try {

        const empresas = await Empresa.find();
        res.json(empresas);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.actualizarEmpresa = async(req, res) => {
    try {

        const { nombre, telefono, direccion, descripcion, logo, cabecera, color } = req.body;
        let empresa = await Empresa.findById(req.params.id);

        if(!empresa)
            res.status(404).json({msg : 'No existe la empresa'});

        empresa.nombre = nombre;
        empresa.telefono = telefono;
        empresa.direccion = direccion;
        empresa.descripcion = descripcion;
        empresa.logo = logo;
        empresa.cabecera = cabecera;
        empresa.color = color;

        empresa = await Empresa.findOneAndUpdate({ _id: req.params.id }, empresa, { new: true});
        res.json(empresa);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerEmpresa = async(req, res) => {
    try {
        let empresa = await Empresa.findById(req.params.id);

        if(!empresa)
            res.status(404).json({msg : 'No existe la empresa'});

        res.json(empresa);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.eliminarEmpresa = async(req, res) => {
    try {
        let empresa = await Empresa.findById(req.params.id);

        if(!empresa)
            res.status(404).json({msg : 'No existe la empresa'});

        await Empresa.findOneAndRemove({ _id: req.params.id });

        res.json({ msg : 'Empresa eliminada con éxito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}