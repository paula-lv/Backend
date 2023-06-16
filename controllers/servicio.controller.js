const Servicio = require('../models/servicio.model')
const bcrypt = require('bcryptjs');

exports.crearServicio = async(req, res) => {
    try {
        let Servicio;

        newServicio = new Servicio({
            idEmpresa: req.body.idEmpresa,
            nombre: req.body.nombre,
            color: req.body.color
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

        const servicio = await Servicio.find();
        res.json(servicio);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.actualizarServicio = async(req, res) => {
    try {

        const { nombre, color } = req.body;
        let servicio = await Servicio.findById(req.params.id);

        if(!servicio)
            res.status(404).json({msg : 'No existe el servicio'});

            servicio.nombre = nombre;
        servicio.color = color;

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