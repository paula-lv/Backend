const cookieParser = require('cookie-parser');
const Empresa = require('../models/empresa.model')
const Usuario = require('../auth/auth.dao')
const bcrypt = require('bcryptjs');

exports.crearEmpresa = async(req, res) => {
    try {
        let newEmpresa;

        newEmpresa = new Empresa({
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            logo: "",
            color: req.body.color,
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

        const { nombre, telefono, direccion, logo, color } = req.body;
        let empresa = await Empresa.findById(req.params.id);

        if(!empresa)
            res.status(404).json({msg : 'No existe la empresa'});

        empresa.nombre = nombre;
        empresa.telefono = telefono;
        empresa.direccion = direccion;
        empresa.logo = logo;
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
        let usuario = await Usuario.findOne( { email: req.body.email } );
        let empresa = await Empresa.findOne( { _id: usuario.idEmpresa } );

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
        let empresa = await Empresa.findOne( { email: req.body.email } );

        if(!empresa)
            res.status(404).json({msg : 'No existe la empresa'});

        await Empresa.findOneAndRemove({ email: req.body.email });

        res.json({ msg : 'Empresa eliminada con éxito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}