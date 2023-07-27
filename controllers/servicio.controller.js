const Servicio = require('../models/servicio.model')
const bcrypt = require('bcryptjs');
const Usuario = require('../auth/auth.dao')

exports.crearServicio = async(req, res) => {
    try {
        let newServicio;
        let usuario = await Usuario.findOne( { email: req.body.email } );

        newServicio = new Servicio({
            idEmpresa: usuario.idEmpresa,
            nombre: req.body.nombre,
            precio: req.body.precio,
            color: req.body.color,
            duracion: req.body.duracion
        });
    
        await newServicio.save();
        res.send(newServicio)

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerServicios = async(req, res) => {
    try {
        let usuario = await Usuario.findOne( { email: req.query.email } );
        const servicio = await Servicio.find( { idEmpresa: usuario.idEmpresa } );
        res.json(servicio);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.actualizarServicio = async(req, res) => {
    try {

        const { nombre,precio,  color, duracion } = req.body;
        let servicio = await Servicio.findById(req.params.id);

        if(!servicio)
            res.status(404).json({msg : 'No existe el servicio'});

            servicio.nombre = nombre;
            servicio.color = color;
            servicio.precio = precio;
            servicio.duracion = duracion;

        servicio = await Servicio.findOneAndUpdate({ _id: req.params.id }, servicio, { new: true});
        res.json(servicio);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerServicio = async(req, res) => {
    try {
        let servicio = await Servicio.findById(req.params.id);

        if(!servicio)
            res.status(404).json({msg : 'No existe el servicio'});

        res.json(servicio);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.eliminarServicio = async(req, res) => {
    try {
        let servicio = await Servicio.findById(req.params.id);

        if(!servicio)
            res.status(404).json({msg : 'No existe el servicio'});

        await Servicio.findOneAndRemove({ _id: req.params.id });

        res.json({ msg : 'Servicio eliminado con éxito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}