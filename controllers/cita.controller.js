const Cita = require('../models/cita.model')
const bcrypt = require('bcryptjs');

exports.crear = async(req, res) => {
    try {
        let Cita;

        newCita = new Cita({
            idEmpresa: req.body.idEmpresa,
            idServicio: req.body.idServicio,
            idEmpleado: req.body.idEmpleado,
            fecha: req.body.nombre,
            estado: req.body.estado,
            valoracion: req.body.valoracion || '',
            mensaje: req.body.mensaje || '',

        });
    
        await newCita.save();
        res.send(newCita)

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerCita = async(req, res) => {
    try {
        const cita = await Cita.find();
        res.json(cita);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.actualizarCita = async(req, res) => {
    try {

        const { idServicio, idEmpleado, fecha, estado, valoracion, mensaje } = req.body;
        let cita = await Cita.findById(req.params.id);

        if(!cita)
            res.status(404).json({msg : 'No existe la cita'});

            idServicio = idServicio;
            idEmpleado = idEmpleado;
            fecha = fecha;
            estado = estado;
            valoracion = valoracion;
            mensaje = mensaje;

        cita = await Cita.findOneAndUpdate({ _id: req.params.id }, cita, { new: true});
        res.json(cita);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.obtenerCita = async(req, res) => {
    try {
        let cita = await Cita.findById(req.params.id);

        if(!cita)
            res.status(404).json({msg : 'No existe la cita'});

        res.json(cita);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}

exports.eliminarCita = async(req, res) => {
    try {
        let cita = await Cita.findById(req.params.id);

        if(!cita)
            res.status(404).json({msg : 'No existe la cita'});

        await Cita.findOneAndRemove({ _id: req.params.id });

        res.json({ msg : 'Cita eliminada con éxito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Ha habido un error')
    }
}